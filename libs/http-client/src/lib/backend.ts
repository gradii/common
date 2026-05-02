/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Observable } from 'rxjs';

import { HttpRequest } from './request';
import { HttpEvent } from './response';

/**
 * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
 * `HttpResponse`.
 *
 * `HttpHandler` is the public interface used by interceptors. The `next` argument given to an
 * interceptor's `intercept()` method is an `HttpHandler` representing the rest of the chain.
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 *
 * @publicApi
 */
export abstract class HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

/**
 * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
 *
 * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
 *
 * `HttpBackend` dispatches requests directly to the backend, without going through the
 * interceptor chain.
 *
 * @publicApi
 */
export abstract class HttpBackend implements HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

/**
 * `HttpHandler` which composes a chain of functional interceptors and forwards the resulting
 * request to a final `HttpBackend`.
 *
 * This replaces Angular's DI-based `HttpInterceptorHandler`. The chain is built once at
 * construction time and reused for every request.
 */
export class HttpInterceptorHandler implements HttpHandler {
  private chain: ChainedInterceptorFn<unknown> | null = null;

  constructor(
    private readonly backend: HttpBackend,
    private readonly interceptorFns: readonly HttpInterceptorFn[],
  ) {}

  handle(initialRequest: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      // Note: interceptors are wrapped right-to-left so that final execution order is
      // left-to-right. That is, if `interceptorFns` is the array `[a, b, c]`, we want to
      // produce a chain that is conceptually `c(b(a(end)))`, which we build from the inside
      // out.
      this.chain = this.interceptorFns.reduceRight(
        (nextSequencedFn, interceptorFn) => chainedInterceptorFn(nextSequencedFn, interceptorFn),
        interceptorChainEndFn as ChainedInterceptorFn<unknown>,
      );
    }

    return this.chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest));
  }
}

// The interceptor types are imported here (and re-exported by `interceptor.ts`) so that the
// chain helpers above can reference them without introducing a circular import.
import type { ChainedInterceptorFn, HttpInterceptorFn } from './interceptor';
import { chainedInterceptorFn, interceptorChainEndFn } from './interceptor';
