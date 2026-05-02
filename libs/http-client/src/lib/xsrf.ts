/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Observable } from 'rxjs';

import { parseCookieValue } from './_cookie';
import { HttpHandlerFn, HttpInterceptorFn } from './interceptor';
import { HttpRequest } from './request';
import { HttpEvent } from './response';

export const XSRF_DEFAULT_COOKIE_NAME = 'XSRF-TOKEN';
export const XSRF_DEFAULT_HEADER_NAME = 'X-XSRF-TOKEN';

/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 * @publicApi
 */
export abstract class HttpXsrfTokenExtractor {
  /**
   * Get the XSRF token to use with an outgoing request.
   *
   * Will be called for every request, so the token may change between requests.
   */
  abstract getToken(): string | null;
}

/**
 * Source of cookies for the cookie-based XSRF token extractor.
 *
 * In Angular this comes from `DOCUMENT`. Here it is a generic interface so callers can
 * provide cookies from any source — `document.cookie`, the request headers in NestJS,
 * a session store, etc.
 *
 * @publicApi
 */
export interface CookieSource {
  /** A semicolon-separated cookie string. */
  cookie: string;
}

/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
export class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {
  private lastCookieString: string = '';
  private lastToken: string | null = null;

  /**
   * @internal for testing
   */
  parseCount: number = 0;

  constructor(
    private readonly source: CookieSource,
    private readonly cookieName: string = XSRF_DEFAULT_COOKIE_NAME,
  ) {}

  getToken(): string | null {
    const cookieString = this.source.cookie || '';
    if (cookieString !== this.lastCookieString) {
      this.parseCount++;
      this.lastToken        = parseCookieValue(cookieString, this.cookieName);
      this.lastCookieString = cookieString;
    }
    return this.lastToken;
  }
}

/**
 * Options used to build an XSRF interceptor function.
 *
 * @publicApi
 */
export interface XsrfInterceptorOptions {
  /** Token extractor used to read the XSRF token (e.g. from a cookie). */
  tokenExtractor: HttpXsrfTokenExtractor;
  /** Header to set on outgoing requests. Defaults to `X-XSRF-TOKEN`. */
  headerName?: string;
  /**
   * Optional origin used to skip cross-origin requests. When provided, the request URL is
   * resolved against this origin and only requests with the same origin receive the token.
   * If omitted, only the absolute-URL check (http:// / https://) is applied.
   */
  origin?: string;
}

/**
 * Build an `HttpInterceptorFn` which adds an XSRF token to eligible outgoing requests.
 *
 * @publicApi
 */
export function createXsrfInterceptor(options: XsrfInterceptorOptions): HttpInterceptorFn {
  const tokenExtractor = options.tokenExtractor;
  const headerName     = options.headerName ?? XSRF_DEFAULT_HEADER_NAME;
  const origin         = options.origin;

  return (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    // Skip both non-mutating requests and absolute URLs.
    // Non-mutating requests don't require a token, and absolute URLs require special handling
    // anyway as the cookie set on our origin is not the same as the token expected by another origin.
    if (req.method === 'GET' || req.method === 'HEAD') {
      return next(req);
    }

    const lcUrl = req.url.toLowerCase();
    if (!origin && (lcUrl.startsWith('http://') || lcUrl.startsWith('https://'))) {
      return next(req);
    }

    if (origin) {
      try {
        const { origin: locationOrigin } = new URL(origin);
        // We can use `new URL` to normalize a relative URL like '//something.com' to
        // 'https://something.com' in order to make consistent same-origin comparisons.
        const { origin: requestOrigin } = new URL(req.url, locationOrigin);

        if (locationOrigin !== requestOrigin) {
          return next(req);
        }
      } catch {
        // Handle invalid URLs gracefully.
        return next(req);
      }
    }

    const token = tokenExtractor.getToken();

    // Be careful not to overwrite an existing header of the same name.
    if (token != null && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next(req);
  };
}
