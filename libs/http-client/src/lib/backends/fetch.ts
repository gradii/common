/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Observable, Observer } from 'rxjs';

import type { HttpBackend } from '../backend';
import { HttpRuntimeError, RuntimeErrorCode } from '../errors';
import { HttpHeaders } from '../headers';
import { ACCEPT_HEADER, ACCEPT_HEADER_VALUE, CONTENT_TYPE_HEADER, HttpRequest } from '../request';
import {
  HTTP_STATUS_CODE_OK,
  HttpDownloadProgressEvent,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaderResponse,
  HttpResponse,
} from '../response';

const XSSI_PREFIX = /^\)\]\}',?\n/;

let uploadProgressWarningLogged = false;

/**
 * Uses `fetch` to send requests to a backend server.
 *
 * This `FetchBackend` requires the support of the
 * [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) which is available on all
 * supported browsers and on Node.js v18 or later.
 *
 * @see {@link HttpHandler}
 *
 * @publicApi
 */
export class FetchBackend implements HttpBackend {
  // We use an arrow function to always reference the current global implementation of `fetch`.
  // This is helpful for cases when the global `fetch` implementation is modified by external code,
  // see https://github.com/angular/angular/issues/57527.
  private readonly fetchImpl: typeof fetch;

  constructor(fetchImpl?: typeof fetch | { fetch: typeof fetch }) {
    if (fetchImpl == null) {
      this.fetchImpl = (input, init) => globalThis.fetch(input, init);
    } else if (typeof fetchImpl === 'function') {
      this.fetchImpl = fetchImpl;
    } else {
      this.fetchImpl = fetchImpl.fetch;
    }
  }

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      const aborter = new AbortController();

      this.doRequest(request, aborter.signal, observer).then(noop, (error) =>
        observer.error(new HttpErrorResponse({ error })),
      );

      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      if (request.timeout) {
        // TODO: Replace with AbortSignal.any([aborter.signal, AbortSignal.timeout(request.timeout)])
        // when AbortSignal.any support is Baseline widely available (NET nov. 2026)
        timeoutId = setTimeout(() => {
          if (!aborter.signal.aborted) {
            aborter.abort(new DOMException('signal timed out', 'TimeoutError'));
          }
        }, request.timeout);
      }

      return () => {
        if (timeoutId !== undefined) {
          clearTimeout(timeoutId);
        }
        aborter.abort();
      };
    });
  }

  private async doRequest(
    request: HttpRequest<any>,
    signal: AbortSignal,
    observer: Observer<HttpEvent<any>>,
  ): Promise<void> {
    const init = this.createRequestInit(request);
    let response;
    try {
      const fetchPromise = this.fetchImpl(request.urlWithParams, { signal, ...init });

      // Make sure unhandled promise rejection warnings are silenced if the Promise
      // is rejected synchronously. See function description for additional information.
      silenceSuperfluousUnhandledPromiseRejection(fetchPromise);

      // Send the `Sent` event before awaiting the response.
      observer.next({ type: HttpEventType.Sent });

      response = await fetchPromise;
    } catch (error: any) {
      observer.error(
        new HttpErrorResponse({
          error,
          status    : error.status ?? 0,
          statusText: error.statusText,
          url       : request.urlWithParams,
          headers   : error.headers,
        }),
      );
      return;
    }

    const headers    = new HttpHeaders(response.headers);
    const statusText = response.statusText;
    const url        = response.url || request.urlWithParams;

    let status                                            = response.status;
    let body: string | ArrayBuffer | Blob | object | null = null;

    const reportDownloadProgress = request.reportProgress || request.reportDownloadProgress;
    if (reportDownloadProgress) {
      observer.next(new HttpHeaderResponse({ headers, status, statusText, url }));
    }

    if (response.body) {
      // Read Progress
      const contentLength        = response.headers.get('content-length');
      const chunks: Uint8Array[] = [];
      const reader               = response.body.getReader();
      let receivedLength         = 0;

      let decoder: TextDecoder;
      let partialText: string | undefined;

      // Here calling the async ReadableStreamDefaultReader.read() drives chunked reads.
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;

        if (reportDownloadProgress) {
          partialText =
            request.responseType === 'text'
              ? (partialText ?? '') +
                (decoder ??= new TextDecoder()).decode(value, { stream: true })
              : undefined;

          observer.next({
            type   : HttpEventType.DownloadProgress,
            total  : contentLength ? +contentLength : undefined,
            loaded : receivedLength,
            partialText,
          } as HttpDownloadProgressEvent);
        }
      }

      // Combine all chunks.
      const chunksAll = this.concatChunks(chunks, receivedLength);
      try {
        const contentType = response.headers.get(CONTENT_TYPE_HEADER) ?? '';
        body              = this.parseBody(request, chunksAll, contentType, status);
      } catch (error) {
        // Body loading or parsing failed
        observer.error(
          new HttpErrorResponse({
            error,
            headers   : new HttpHeaders(response.headers),
            status    : response.status,
            statusText: response.statusText,
            url       : response.url || request.urlWithParams,
          }),
        );
        return;
      }
    }

    // Same behavior as the XhrBackend
    if (status === 0) {
      status = body ? HTTP_STATUS_CODE_OK : 0;
    }

    // ok determines whether the response will be transmitted on the event or
    // error channel. Unsuccessful status codes (not 2xx) will always be errors,
    // but a successful status code can still result in an error if the user
    // asked for JSON data and the body cannot be parsed as such.
    const ok = status >= 200 && status < 300;

    const redirected = response.redirected;

    const responseType = response.type;

    if (ok) {
      observer.next(
        new HttpResponse({
          body,
          headers,
          status,
          statusText,
          url,
          redirected,
          responseType,
        }),
      );

      // The full body has been received and delivered, no further events
      // are possible. This request is complete.
      observer.complete();
    } else {
      observer.error(
        new HttpErrorResponse({
          error: body,
          headers,
          status,
          statusText,
          url,
          redirected,
          responseType,
        }),
      );
    }
  }

  private parseBody(
    request: HttpRequest<any>,
    binContent: Uint8Array,
    contentType: string,
    status: number,
  ): string | ArrayBuffer | Blob | object | null {
    switch (request.responseType) {
      case 'json':
        // stripping the XSSI when present
        const text = new TextDecoder().decode(binContent).replace(XSSI_PREFIX, '');
        if (text === '') {
          return null;
        }
        try {
          return JSON.parse(text) as object;
        } catch (e: unknown) {
          // Allow handling non-JSON errors (!) as plain text, same as the XHR
          // backend. Without this special sauce, any non-JSON error would be
          // completely inaccessible downstream as the `HttpErrorResponse.error`
          // would be set to the `SyntaxError` from then failing `JSON.parse`.
          if (status < 200 || status >= 300) {
            return text;
          }
          throw e;
        }
      case 'text':
        return new TextDecoder().decode(binContent);
      case 'blob':
        return new Blob([binContent as BlobPart], { type: contentType });
      case 'arraybuffer':
        return binContent.buffer as ArrayBuffer;
    }
  }

  private createRequestInit(req: HttpRequest<any>): RequestInit {
    if (req.reportUploadProgress) {
      throw new HttpRuntimeError(
        RuntimeErrorCode.FETCH_UPLOAD_PROGRESS_NOT_SUPPORTED,
        'The FetchBackend does not support upload progress reporting. Please use `HttpXhrBackend` if you want to report upload progress.',
      );
    }

    // We could share some of this logic with the XhrBackend
    const headers: Record<string, string> = {};
    let credentials: RequestCredentials | undefined;

    // If the request has a credentials property, use it.
    // Otherwise, if the request has withCredentials set to true, use 'include'.
    credentials = req.credentials;

    // If withCredentials is true should be set to 'include', for compatibility
    if (req.withCredentials) {
      // A warning is logged if the request has both
      warningOptionsMessage(req);
      credentials = 'include';
    }

    // Setting all the requested headers.
    req.headers.forEach((name, values) => (headers[name] = values.join(',')));

    // Add an Accept header if one isn't present already.
    if (!req.headers.has(ACCEPT_HEADER)) {
      headers[ACCEPT_HEADER] = ACCEPT_HEADER_VALUE;
    }

    // Auto-detect the Content-Type header if one isn't present already.
    if (!req.headers.has(CONTENT_TYPE_HEADER)) {
      const detectedType = req.detectContentTypeHeader();
      // Sometimes Content-Type detection fails.
      if (detectedType !== null) {
        headers[CONTENT_TYPE_HEADER] = detectedType;
      }
    }

    return {
      body          : req.serializeBody(),
      method        : req.method,
      headers,
      credentials,
      keepalive     : req.keepalive,
      cache         : req.cache,
      priority      : req.priority,
      mode          : req.mode,
      redirect      : req.redirect,
      referrer      : req.referrer,
      integrity     : req.integrity,
      referrerPolicy: req.referrerPolicy,
    };
  }

  private concatChunks(chunks: Uint8Array[], totalLength: number): Uint8Array {
    const chunksAll = new Uint8Array(totalLength);
    let position    = 0;
    for (const chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }

    return chunksAll;
  }
}

/**
 * Abstract class to provide a mocked implementation of `fetch()`
 */
export abstract class FetchFactory {
  abstract fetch: typeof fetch;
}

function noop(): void {}

function warningOptionsMessage(req: HttpRequest<any>) {
  if (req.credentials && req.withCredentials) {
    console.warn(
      `NG0${RuntimeErrorCode.WITH_CREDENTIALS_OVERRIDES_EXPLICIT_CREDENTIALS}: A \`HttpClient\` request has both \`withCredentials: true\` and \`credentials: '${req.credentials}'\` options. The \`withCredentials\` option is overriding the explicit \`credentials\` setting to 'include'. Consider removing \`withCredentials\` and using \`credentials: '${req.credentials}'\` directly for clarity.`,
    );
  }
}

/**
 * Adds a noop `.then` to a Promise to suppress unhandled-rejection warnings if it rejects
 * synchronously before the await on it has a chance to attach a handler.
 */
function silenceSuperfluousUnhandledPromiseRejection(promise: Promise<unknown>) {
  promise.then(noop, noop);
}
