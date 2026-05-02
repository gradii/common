/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Injectable, InjectionToken } from '@nestjs/common';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@gradii/http-client';
import { Observable } from 'rxjs';

// Re-export the legacy class-based interceptor interface so that consumers can keep using it
// without depending on `@gradii/http-client` directly.
export { HttpInterceptor };

/**
 * A multi-provider token that represents the array of registered
 * `HttpInterceptor` objects.
 *
 * @publicApi
 */
export const HTTP_INTERCEPTORS: InjectionToken<HttpInterceptor[]> = Symbol('HTTP_INTERCEPTORS');

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}

export const XSRF_COOKIE_NAME: InjectionToken<string> = Symbol('XSRF_COOKIE_NAME');
export const XSRF_HEADER_NAME: InjectionToken<string> = Symbol('XSRF_HEADER_NAME');

/**
 * Source of cookies used by the XSRF cookie extractor. NestJS apps typically wire this to a
 * value derived from the incoming request (`req.headers.cookie`).
 */
export const XSRF_COOKIE_SOURCE: InjectionToken<{ cookie: string }> = Symbol('XSRF_COOKIE_SOURCE');
