/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Observable, of } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';

import { HttpHandler } from './backend';
import { HttpRuntimeError, RuntimeErrorCode } from './errors';
import { HttpHeaders } from './headers';
import { HttpParams, HttpParamsOptions } from './params';
import { HttpRequest, HttpRequestOptions } from './request';
import { HttpEvent, HttpResponse } from './response';

/**
 * Common options for HttpClient requests.
 *
 * @publicApi 22.0
 */
export interface HttpClientCommonOptions extends Omit<HttpRequestOptions, 'headers' | 'params'> {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body' | 'events' | 'response';
  params?:
    | HttpParams
    | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
}

/**
 * Constructs an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
 * the given `body`. This function clones the object and adds the body.
 *
 * Note that the `responseType` *options* value is a String that identifies the
 * single data type of the response.
 * A single overload version of the method handles each response type.
 * The value of `responseType` cannot be a union, as the combined signature could imply.
 *
 */
function addBody<T>(options: HttpClientCommonOptions, body: T | null): any {
  return {
    body,
    headers        : options.headers,
    context        : options.context,
    observe        : options.observe,
    params         : options.params,
    reportProgress : options.reportProgress,
    responseType   : options.responseType,
    withCredentials: options.withCredentials,
    credentials    : options.credentials,
    transferCache  : options.transferCache,
    timeout        : options.timeout,
    keepalive      : options.keepalive,
    priority       : options.priority,
    cache          : options.cache,
    mode           : options.mode,
    redirect       : options.redirect,
    integrity      : options.integrity,
    referrer       : options.referrer,
    referrerPolicy : options.referrerPolicy,
  };
}

/**
 * Performs HTTP requests.
 * This service is available as an injectable class, with methods to perform HTTP requests.
 * Each request method has multiple signatures, and the return type varies based on
 * the signature that is called (mainly the values of `observe` and `responseType`).
 *
 * Note that the `responseType` *options* value is a String that identifies the
 * single data type of the response.
 * A single overload version of the method handles each response type.
 * The value of `responseType` cannot be a union, as the combined signature could imply.
 *
 * @usageNotes
 *
 * ### HTTP Request Example
 *
 * ```ts
 *  // GET heroes whose name contains search term
 * searchHeroes(term: string): Observable<Hero[]>{
 *
 *  const params = new HttpParams({fromString: 'name=term'});
 *    return this.httpClient.request('GET', this.heroesUrl, {responseType:'json', params});
 * }
 * ```
 *
 * Alternatively, the parameter string can be used without invoking HttpParams
 * by directly joining to the URL.
 * ```ts
 * this.httpClient.request('GET', this.heroesUrl + '?' + 'name=term', {responseType:'json'});
 * ```
 *
 * ### PATCH Example
 * ```ts
 * // PATCH one of the heroes' name
 * patchHero (id: number, heroName: string): Observable<{}> {
 * const url = `${this.heroesUrl}/${id}`;   // PATCH api/heroes/42
 *  return this.httpClient.patch(url, {name: heroName}, httpOptions)
 *    .pipe(catchError(this.handleError('patchHero')));
 * }
 * ```
 *
 * @see [HTTP Guide](guide/http)
 *
 * @publicApi
 */
export class HttpClient {
  constructor(private handler: HttpHandler) {}

  /**
   * Sends an `HttpRequest` and returns a stream of `HttpEvent`s.
   *
   * @return An `Observable` of the response, with the response body as a stream of `HttpEvent`s.
   */
  request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>>;

  /**
   * Constructs a request that interprets the body as an `ArrayBuffer` and returns the response in
   * an `ArrayBuffer`.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe?: 'body';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<ArrayBuffer>;

  /**
   * Constructs a request that interprets the body as a blob and returns
   * the response as a blob.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe?: 'body';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<Blob>;

  /**
   * Constructs a request that interprets the body as a text string and
   * returns a string value.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe?: 'body';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<string>;

  /**
   * Constructs a request that interprets the body as an `ArrayBuffer` and returns the
   * the full event stream.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'events';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a request that interprets the body as a `Blob` and returns
   * the full event stream.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'events';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a request which interprets the body as a text string and returns the full event
   * stream.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'events';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<string>>;

  /**
   * Constructs a request which interprets the body as a JavaScript object and returns the full
   * event stream.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<any>>;

  /**
   * Constructs a request which interprets the body as a JavaScript object and returns the full
   * event stream.
   */
  request<R>(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<R>>;

  /**
   * Constructs a request which interprets the body as an `ArrayBuffer`
   * and returns the full `HttpResponse`.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'response';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a request which interprets the body as a `Blob` and returns the full `HttpResponse`.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'response';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a request which interprets the body as a text stream and returns the full
   * `HttpResponse`.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'response';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<string>>;

  /**
   * Constructs a request which interprets the body as a JavaScript object and returns the full
   * `HttpResponse`.
   */
  request(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Object>>;

  /**
   * Constructs a request which interprets the body as a JavaScript object and returns
   * the full `HttpResponse` with the response body in the requested type.
   */
  request<R>(
    method: string,
    url: string,
    options: {
      body?: any;
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<R>>;

  /**
   * Constructs a request which interprets the body as a JavaScript object and returns the full
   * `HttpResponse` as a JavaScript object.
   */
  request(
    method: string,
    url: string,
    options?: {
      body?: any;
      observe?: 'body';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<Object>;

  /**
   * Constructs a request which interprets the body as a JavaScript object
   * with the response body of the requested type.
   */
  request<R>(
    method: string,
    url: string,
    options?: {
      body?: any;
      observe?: 'body';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<R>;

  /**
   * Constructs a request where response type and requested observable are not known statically.
   */
  request(
    method: string,
    url: string,
    options?: {
      body?: any;
      observe?: 'body' | 'events' | 'response';
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    } & HttpClientCommonOptions,
  ): Observable<any>;

  /**
   * Constructs an observable for a generic HTTP request that, when subscribed,
   * fires the request through the chain of registered interceptors and on to the
   * server.
   *
   * You can pass an `HttpRequest` directly as the only parameter. In this case,
   * the call returns an observable of the raw `HttpEvent` stream.
   *
   * Alternatively you can pass an HTTP method as the first parameter,
   * a URL string as the second, and an options hash containing the request body as the third.
   * See `addBody()`. In this case, the specified `responseType` and `observe` options determine the
   * type of returned observable.
   *   * The `responseType` value determines how a successful response body is parsed.
   *   * If `responseType` is the default `json`, you can pass a type interface for the resulting
   * object as a type parameter to the call.
   *
   * The `observe` value determines the return type, according to what you are interested in
   * observing.
   *   * An `observe` value of events returns an observable of the raw `HttpEvent` stream, including
   * progress events by default.
   *   * An `observe` value of response returns an observable of `HttpResponse<T>`,
   * where the `T` parameter depends on the `responseType` and any optionally provided type
   * parameter.
   *   * An `observe` value of body returns an observable of `<T>` with the same `T` body type.
   */
  request(
    first: string | HttpRequest<any>,
    url?: string,
    options: {
      body?: any;
      observe?: 'body' | 'events' | 'response';
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    } & HttpClientCommonOptions = {},
  ): Observable<any> {
    let req: HttpRequest<any>;
    // First, check whether the primary argument is an instance of `HttpRequest`.
    if (first instanceof HttpRequest) {
      // It is. The other arguments must be undefined (per the signatures) and can be
      // ignored.
      req = first;
    } else {
      // It's a string, so it represents a URL. Construct a request based on it,
      // and incorporate the remaining arguments (assuming `GET` unless a method is
      // provided.

      // Figure out the headers.
      let headers: HttpHeaders | undefined = undefined;
      if (options.headers instanceof HttpHeaders) {
        headers = options.headers;
      } else {
        headers = new HttpHeaders(options.headers as { [name: string]: string | string[] });
      }

      // Sort out parameters.
      let params: HttpParams | undefined = undefined;
      if (!!options.params) {
        if (options.params instanceof HttpParams) {
          params = options.params;
        } else {
          params = new HttpParams({ fromObject: options.params } as HttpParamsOptions);
        }
      }
      // Construct the request.
      req = new HttpRequest(first, url!, options.body !== undefined ? options.body : null, {
        headers,
        context               : options.context,
        params,
        reportProgress        : options.reportProgress,
        reportUploadProgress  : options.reportUploadProgress,
        reportDownloadProgress: options.reportDownloadProgress,
        // By default, JSON is assumed to be returned for all calls.
        responseType          : options.responseType || 'json',
        withCredentials       : options.withCredentials,
        transferCache         : options.transferCache,
        keepalive             : options.keepalive,
        priority              : options.priority,
        cache                 : options.cache,
        mode                  : options.mode,
        redirect              : options.redirect,
        credentials           : options.credentials,
        referrer              : options.referrer,
        referrerPolicy        : options.referrerPolicy,
        integrity             : options.integrity,
        timeout               : options.timeout,
      });
    }
    // Start with an Observable.of() the initial request, and run the handler (which
    // includes all interceptors) inside a concatMap(). This way, the handler runs
    // inside an Observable chain, which causes interceptors to be re-run on every
    // subscription (this also makes retries re-run the handler, including interceptors).
    const events$: Observable<HttpEvent<any>> = of(req).pipe(
      concatMap((req: HttpRequest<any>) => this.handler.handle(req)),
    );

    // If coming via the API signature which accepts a previously constructed HttpRequest,
    // the only option is to get the event stream. Otherwise, return the event stream if
    // that is what was requested.
    if (first instanceof HttpRequest || options.observe === 'events') {
      return events$;
    }

    // The requested stream contains either the full response or the body. In either
    // case, the first step is to filter the event stream to extract a stream of
    // responses(s).
    const res$: Observable<HttpResponse<any>> = <Observable<HttpResponse<any>>>(
      events$.pipe(filter((event: HttpEvent<any>) => event instanceof HttpResponse))
    );

    // Decide which stream to return.
    switch (options.observe || 'body') {
      case 'body':
        // The requested stream is the body. Map the response stream to the response
        // body. This could be done more simply, but a misbehaving interceptor might
        // transform the response body into a different format and ignore the requested
        // responseType. Guard against this by validating that the response is of the
        // requested type.
        switch (req.responseType) {
          case 'arraybuffer':
            return res$.pipe(
              map((res: HttpResponse<any>) => {
                // Validate that the body is an ArrayBuffer.
                if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                  throw new HttpRuntimeError(
                    RuntimeErrorCode.RESPONSE_IS_NOT_AN_ARRAY_BUFFER,
                    'Response is not an ArrayBuffer.',
                  );
                }
                return res.body;
              }),
            );
          case 'blob':
            return res$.pipe(
              map((res: HttpResponse<any>) => {
                // Validate that the body is a Blob.
                if (res.body !== null && !(res.body instanceof Blob)) {
                  throw new HttpRuntimeError(
                    RuntimeErrorCode.RESPONSE_IS_NOT_A_BLOB,
                    'Response is not a Blob.',
                  );
                }
                return res.body;
              }),
            );
          case 'text':
            return res$.pipe(
              map((res: HttpResponse<any>) => {
                // Validate that the body is a string.
                if (res.body !== null && typeof res.body !== 'string') {
                  throw new HttpRuntimeError(
                    RuntimeErrorCode.RESPONSE_IS_NOT_A_STRING,
                    'Response is not a string.',
                  );
                }
                return res.body;
              }),
            );
          case 'json':
          default:
            // No validation needed for JSON responses, as they can be of any type.
            return res$.pipe(map((res: HttpResponse<any>) => res.body));
        }
      case 'response':
        // The response stream was requested directly, so return it.
        return res$;
      default:
        // Guard against new future observe types being added.
        throw new HttpRuntimeError(
          RuntimeErrorCode.UNHANDLED_OBSERVE_TYPE,
          `Unreachable: unhandled observe type ${options.observe}}`,
        );
    }
  }

  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
   *  and returns the response as an `ArrayBuffer`.
   */
  delete(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'arraybuffer';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<ArrayBuffer>;

  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   */
  delete(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'blob';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<Blob>;

  /**
   * Constructs a `DELETE` request that interprets the body as a text string and returns
   * a string.
   */
  delete(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'text';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<string>;

  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
   *  and returns the full event stream.
   */
  delete(
    url: string,
    options: {
      observe: 'events';
      responseType: 'arraybuffer';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob`
   *  and returns the full event stream.
   */
  delete(
    url: string,
    options: {
      observe: 'events';
      responseType: 'blob';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a text string
   * and returns the full event stream.
   */
  delete(
    url: string,
    options: {
      observe: 'events';
      responseType: 'text';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<string>>;

  /**
   * Constructs a `DELETE` request that interprets the body as JSON
   * and returns the full event stream.
   */
  delete(
    url: string,
    options: {
      observe: 'events';
      responseType?: 'json';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `DELETE`request that interprets the body as JSON
   * and returns the full event stream.
   */
  delete<T>(
    url: string,
    options: {
      observe: 'events';
      responseType?: 'json';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<T>>;

  /**
   * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer` and returns
   *  the full `HttpResponse`.
   */
  delete(
    url: string,
    options: {
      observe: 'response';
      responseType: 'arraybuffer';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a `Blob` and returns the full
   * `HttpResponse`.
   */
  delete(
    url: string,
    options: {
      observe: 'response';
      responseType: 'blob';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `DELETE` request that interprets the body as a text stream and
   *  returns the full `HttpResponse`.
   */
  delete(
    url: string,
    options: {
      observe: 'response';
      responseType: 'text';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<string>>;

  /**
   * Constructs a `DELETE` request the interprets the body as a JavaScript object and returns
   * the full `HttpResponse`.
   */
  delete(
    url: string,
    options: {
      observe: 'response';
      responseType?: 'json';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `DELETE` request that interprets the body as JSON
   * and returns the full `HttpResponse`.
   */
  delete<T>(
    url: string,
    options: {
      observe: 'response';
      responseType?: 'json';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<T>>;

  /**
   * Constructs a `DELETE` request that interprets the body as JSON and
   * returns the response body as an object parsed from JSON.
   */
  delete(
    url: string,
    options?: {
      observe?: 'body';
      responseType?: 'json';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<Object>;

  /**
   * Constructs a DELETE request that interprets the body as JSON and returns
   * the response in a given type.
   */
  delete<T>(
    url: string,
    options?: {
      observe?: 'body';
      responseType?: 'json';
      body?: any | null;
    } & HttpClientCommonOptions,
  ): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `DELETE` request to execute on the server. See the individual overloads for
   * details on the return type.
   */
  delete(
    url: string,
    options: {
      observe?: 'body' | 'events' | 'response';
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      body?: any | null;
    } & HttpClientCommonOptions = {},
  ): Observable<any> {
    return this.request<any>('DELETE', url, options as any);
  }

  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns the
   * response in an `ArrayBuffer`.
   */
  get(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<ArrayBuffer>;

  /**
   * Constructs a `GET` request that interprets the body as a `Blob`
   * and returns the response as a `Blob`.
   */
  get(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<Blob>;

  /**
   * Constructs a `GET` request that interprets the body as a text string
   * and returns the response as a string value.
   */
  get(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<string>;

  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns
   *  the full event stream.
   */
  get(
    url: string,
    options: {
      observe: 'events';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `GET` request that interprets the body as a `Blob` and
   * returns the full event stream.
   */
  get(
    url: string,
    options: {
      observe: 'events';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `GET` request that interprets the body as a text string and returns
   * the full event stream.
   */
  get(
    url: string,
    options: {
      observe: 'events';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<string>>;

  /**
   * Constructs a `GET` request that interprets the body as JSON
   * and returns the full event stream.
   */
  get(
    url: string,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `GET` request that interprets the body as JSON and returns the full
   * event stream.
   */
  get<T>(
    url: string,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<T>>;

  /**
   * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and
   * returns the full `HttpResponse`.
   */
  get(
    url: string,
    options: {
      observe: 'response';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `GET` request that interprets the body as a `Blob` and
   * returns the full `HttpResponse`.
   */
  get(
    url: string,
    options: {
      observe: 'response';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `GET` request that interprets the body as a text stream and
   * returns the full `HttpResponse`.
   */
  get(
    url: string,
    options: {
      observe: 'response';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<string>>;

  /**
   * Constructs a `GET` request that interprets the body as JSON and
   * returns the full `HttpResponse`.
   */
  get(
    url: string,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `GET` request that interprets the body as JSON and returns
   * the full `HttpResponse` with the response body in the requested type.
   */
  get<T>(
    url: string,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<T>>;

  /**
   * Constructs a `GET` request that interprets the body as JSON and
   * returns the response body as an object parsed from JSON.
   */
  get(
    url: string,
    options?: {
      observe?: 'body';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<Object>;

  /**
   * Constructs a `GET` request that interprets the body as JSON and returns
   * the response body in a given type.
   */
  get<T>(
    url: string,
    options?: {
      observe?: 'body';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `GET` request to execute on the server. See the individual overloads for
   * details on the return type.
   */
  get(
    url: string,
    options: {
      observe?: 'body' | 'events' | 'response';
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    } & HttpClientCommonOptions = {},
  ): Observable<any> {
    return this.request<any>('GET', url, options as any);
  }

  /**
   * Constructs a `HEAD` request that interprets the body as an `ArrayBuffer` and
   * returns the response as an `ArrayBuffer`.
   */
  head(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<ArrayBuffer>;

  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   */
  head(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<Blob>;

  /**
   * Constructs a `HEAD` request that interprets the body as a text string and returns the response
   * as a string value.
   */
  head(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<string>;

  /**
   * Constructs a `HEAD` request that interprets the body as an  `ArrayBuffer`
   *  and returns the full event stream.
   */
  head(
    url: string,
    options: {
      observe: 'events';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and
   * returns the full event stream.
   */
  head(
    url: string,
    options: {
      observe: 'events';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a text string
   * and returns the full event stream.
   */
  head(
    url: string,
    options: {
      observe: 'events';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<string>>;

  /**
   * Constructs a `HEAD` request that interprets the body as JSON
   * and returns the full HTTP event stream.
   */
  head(
    url: string,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `HEAD` request that interprets the body as JSON and
   * returns the full event stream.
   */
  head<T>(
    url: string,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<T>>;

  /**
   * Constructs a `HEAD` request that interprets the body as an `ArrayBuffer`
   *  and returns the full HTTP response.
   */
  head(
    url: string,
    options: {
      observe: 'response';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
   * the full `HttpResponse`.
   */
  head(
    url: string,
    options: {
      observe: 'response';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `HEAD` request that interprets the body as text stream
   * and returns the full `HttpResponse`.
   */
  head(
    url: string,
    options: {
      observe: 'response';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<string>>;

  /**
   * Constructs a `HEAD` request that interprets the body as JSON and
   * returns the full `HttpResponse`.
   */
  head(
    url: string,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `HEAD` request that interprets the body as JSON
   * and returns the full `HttpResponse`.
   */
  head<T>(
    url: string,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<T>>;

  /**
   * Constructs a `HEAD` request that interprets the body as JSON and
   * returns the response body as an object parsed from JSON.
   */
  head(url: string, options?: HttpClientCommonOptions): Observable<Object>;

  /**
   * Constructs a `HEAD` request that interprets the body as JSON and returns
   * the response in a given type.
   */
  head<T>(url: string, options?: HttpClientCommonOptions): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `HEAD` request to execute on the server. The `HEAD` method returns
   * meta information about the resource without transferring the
   * resource itself. See the individual overloads for details on the return type.
   */
  head(
    url: string,
    options: {
      observe?: 'body' | 'events' | 'response';
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    } & HttpClientCommonOptions = {},
  ): Observable<any> {
    return this.request<any>('HEAD', url, options as any);
  }

  /**
   * Constructs an `OPTIONS` request that interprets the body as an
   * `ArrayBuffer` and returns the response as an `ArrayBuffer`.
   */
  options(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<ArrayBuffer>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   */
  options(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<Blob>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a text string and
   * returns a string value.
   */
  options(
    url: string,
    options: {
      observe?: 'body';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<string>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
   *  and returns the full event stream.
   */
  options(
    url: string,
    options: {
      observe: 'events';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob` and
   * returns the full event stream.
   */
  options(
    url: string,
    options: {
      observe: 'events';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Blob>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a text string
   * and returns the full event stream.
   */
  options(
    url: string,
    options: {
      observe: 'events';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<string>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as JSON
   * and returns the full event stream.
   */
  options(
    url: string,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Object>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as JSON and
   * returns the full event stream.
   */
  options<T>(
    url: string,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<T>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
   *  and returns the full HTTP response.
   */
  options(
    url: string,
    options: {
      observe: 'response';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as a `Blob`
   *  and returns the full `HttpResponse`.
   */
  options(
    url: string,
    options: {
      observe: 'response';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Blob>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as text stream
   * and returns the full `HttpResponse`.
   */
  options(
    url: string,
    options: {
      observe: 'response';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<string>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as JSON
   * and returns the full `HttpResponse`.
   */
  options(
    url: string,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Object>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as JSON and
   * returns the full `HttpResponse`.
   */
  options<T>(
    url: string,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<T>>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as JSON and returns the
   * response body as an object parsed from JSON.
   */
  options(url: string, options?: HttpClientCommonOptions): Observable<Object>;

  /**
   * Constructs an `OPTIONS` request that interprets the body as JSON and returns the
   * response in a given type.
   */
  options<T>(url: string, options?: HttpClientCommonOptions): Observable<T>;

  /**
   * Constructs an `Observable` that, when subscribed, causes the configured
   * `OPTIONS` request to execute on the server. This method allows the client
   * to determine the supported HTTP methods and other capabilities of an endpoint,
   * without implying a resource action. See the individual overloads for
   * details on the return type.
   */
  options(
    url: string,
    options: {
      observe?: 'body' | 'events' | 'response';
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    } & HttpClientCommonOptions = {},
  ): Observable<any> {
    return this.request<any>('OPTIONS', url, options as any);
  }

  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and returns
   * the response as an `ArrayBuffer`.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe?: 'body';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<ArrayBuffer>;

  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the response
   * as a `Blob`.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe?: 'body';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<Blob>;

  /**
   * Constructs a `PATCH` request that interprets the body as a text string and
   * returns the response as a string value.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe?: 'body';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<string>;

  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and
   *  returns the full event stream.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob`
   *  and returns the full event stream.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a text string and
   * returns the full event stream.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<string>>;

  /**
   * Constructs a `PATCH` request that interprets the body as JSON
   * and returns the full event stream.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `PATCH` request that interprets the body as JSON
   * and returns the full event stream.
   */
  patch<T>(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<T>>;

  /**
   * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer`
   *  and returns the full `HttpResponse`.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the full
   * `HttpResponse`.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `PATCH` request that interprets the body as a text stream and returns the
   * full `HttpResponse`.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<string>>;

  /**
   * Constructs a `PATCH` request that interprets the body as JSON
   * and returns the full `HttpResponse`.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `PATCH` request that interprets the body as JSON
   * and returns the full `HttpResponse`.
   */
  patch<T>(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<T>>;

  /**
   * Constructs a `PATCH` request that interprets the body as JSON and
   * returns the response body as an object parsed from JSON.
   */
  patch(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<Object>;

  /**
   * Constructs a `PATCH` request that interprets the body as JSON
   * and returns the response in a given type.
   */
  patch<T>(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `PATCH` request to execute on the server. See the individual overloads for
   * details on the return type.
   */
  patch(
    url: string,
    body: any | null,
    options: {
      observe?: 'body' | 'events' | 'response';
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    } & HttpClientCommonOptions = {},
  ): Observable<any> {
    return this.request<any>('PATCH', url, addBody(options, body));
  }

  /**
   * Constructs a `POST` request that interprets the body as an `ArrayBuffer` and returns
   * an `ArrayBuffer`.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe?: 'body';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<ArrayBuffer>;

  /**
   * Constructs a `POST` request that interprets the body as a `Blob` and returns the
   * response as a `Blob`.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe?: 'body';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<Blob>;

  /**
   * Constructs a `POST` request that interprets the body as a text string and
   * returns the response as a string value.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe?: 'body';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<string>;

  /**
   * Constructs a `POST` request that interprets the body as an `ArrayBuffer` and
   * returns the full event stream.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `POST` request that interprets the body as a `Blob`
   * and returns the response in an observable of the full event stream.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `POST` request that interprets the body as a text string and returns the full
   * event stream.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<string>>;

  /**
   * Constructs a POST request that interprets the body as JSON and returns the full
   * event stream.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Object>>;

  /**
   * Constructs a POST request that interprets the body as JSON and returns the full
   * event stream.
   */
  post<T>(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<T>>;

  /**
   * Constructs a POST request that interprets the body as an `ArrayBuffer`
   *  and returns the full `HttpResponse`.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `POST` request that interprets the body as a `Blob` and returns the full
   * `HttpResponse`.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `POST` request that interprets the body as a text stream and returns
   * the full `HttpResponse`.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<string>>;

  /**
   * Constructs a `POST` request that interprets the body as JSON
   * and returns the full `HttpResponse`.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `POST` request that interprets the body as JSON and returns the
   * full `HttpResponse`.
   */
  post<T>(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<T>>;

  /**
   * Constructs a `POST` request that interprets the body as JSON
   * and returns the response body as an object parsed from JSON.
   */
  post(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<Object>;

  /**
   * Constructs a `POST` request that interprets the body as JSON
   * and returns an observable of the response.
   */
  post<T>(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `POST` request to execute on the server. The server responds with the location of
   * the replaced resource. See the individual overloads for details on the return type.
   */
  post(
    url: string,
    body: any | null,
    options: {
      observe?: 'body' | 'events' | 'response';
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    } & HttpClientCommonOptions = {},
  ): Observable<any> {
    return this.request<any>('POST', url, addBody(options, body));
  }

  /**
   * Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and returns the
   * response as an `ArrayBuffer`.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe?: 'body';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<ArrayBuffer>;

  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns
   * the response as a `Blob`.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe?: 'body';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<Blob>;

  /**
   * Constructs a `PUT` request that interprets the body as a text string and
   * returns the response as a string value.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe?: 'body';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<string>;

  /**
   * Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and
   * returns the full event stream.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<ArrayBuffer>>;

  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns the full event
   * stream.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Blob>>;

  /**
   * Constructs a `PUT` request that interprets the body as a text string and returns the full event
   * stream.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<string>>;

  /**
   * Constructs a `PUT` request that interprets the body as JSON and returns the full
   * event stream.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<Object>>;

  /**
   * Constructs a `PUT` request that interprets the body as JSON and returns the
   * full event stream.
   */
  put<T>(
    url: string,
    body: any | null,
    options: {
      observe: 'events';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpEvent<T>>;

  /**
   * Constructs a `PUT` request that interprets the body as an
   * `ArrayBuffer` and returns an observable of the full HTTP response.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType: 'arraybuffer';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<ArrayBuffer>>;

  /**
   * Constructs a `PUT` request that interprets the body as a `Blob` and returns the
   * full HTTP response.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType: 'blob';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Blob>>;

  /**
   * Constructs a `PUT` request that interprets the body as a text stream and returns the
   * full HTTP response.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType: 'text';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<string>>;

  /**
   * Constructs a `PUT` request that interprets the body as JSON and returns the full
   * HTTP response.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<Object>>;

  /**
   * Constructs a `PUT` request that interprets the body as an instance of the requested type and
   * returns the full HTTP response.
   */
  put<T>(
    url: string,
    body: any | null,
    options: {
      observe: 'response';
      responseType?: 'json';
    } & HttpClientCommonOptions,
  ): Observable<HttpResponse<T>>;

  /**
   * Constructs a `PUT` request that interprets the body as JSON
   * and returns an observable of JavaScript object.
   */
  put(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<Object>;

  /**
   * Constructs a `PUT` request that interprets the body as an instance of the requested type
   * and returns an observable of the requested type.
   */
  put<T>(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<T>;

  /**
   * Constructs an observable that, when subscribed, causes the configured
   * `PUT` request to execute on the server. The `PUT` method replaces an existing resource
   * with a new set of values.
   * See the individual overloads for details on the return type.
   */
  put(
    url: string,
    body: any | null,
    options: {
      observe?: 'body' | 'events' | 'response';
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    } & HttpClientCommonOptions = {},
  ): Observable<any> {
    return this.request<any>('PUT', url, addBody(options, body));
  }
}
