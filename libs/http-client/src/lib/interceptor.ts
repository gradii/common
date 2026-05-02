/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Observable } from 'rxjs';

import type { HttpHandler } from './backend';
import { HttpRequest } from './request';
import { HttpEvent } from './response';

/**
 * Intercepts and handles an `HttpRequest` or `HttpResponse`.
 *
 * Most interceptors transform the outgoing request before passing it to the
 * next interceptor in the chain, by calling `next.handle(transformedReq)`.
 * An interceptor may transform the
 * response event stream as well, by applying additional RxJS operators on the stream
 * returned by `next.handle()`.
 *
 * More rarely, an interceptor may handle the request entirely,
 * and compose a new event stream instead of invoking `next.handle()`. This is an
 * acceptable behavior, but keep in mind that further interceptors will be skipped entirely.
 *
 * It is also rare but valid for an interceptor to return multiple responses on the
 * event stream for a single request.
 *
 * @publicApi
 *
 * @see [HTTP Guide](guide/http/interceptors)
 * @see {@link HttpInterceptorFn}
 *
 * @usageNotes
 *
 * Class-based interceptors are kept for backward compatibility, but the recommended
 * style is to use functional interceptors (`HttpInterceptorFn`) and pass them to
 * `createHttpClient({ interceptors: [...] })`.
 */
export interface HttpInterceptor {
  /**
   * Identifies and handles a given HTTP request.
   * @param req The outgoing request object to handle.
   * @param next The next interceptor in the chain, or the backend
   * if no interceptors remain in the chain.
   * @returns An observable of the event stream.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}

/**
 * Represents the next interceptor in an interceptor chain, or the real backend if there are no
 * further interceptors.
 *
 * Most interceptors will delegate to this function, and either modify the outgoing request or the
 * response when it arrives. Within the scope of the current request, however, this function may be
 * called any number of times, for any number of downstream requests. Such downstream requests need
 * not be to the same URL or even the same origin as the current request. It is also valid to not
 * call the downstream handler at all, and process the current request entirely within the
 * interceptor.
 *
 * This function should only be called within the scope of the request that's currently being
 * intercepted. Once that request is complete, this downstream handler function should not be
 * called.
 *
 * @publicApi
 *
 * @see [HTTP Guide](guide/http/interceptors)
 */
export type HttpHandlerFn = (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>;

/**
 * An interceptor for HTTP requests made via `HttpClient`.
 *
 * `HttpInterceptorFn`s are middleware functions which `HttpClient` calls when a request is made.
 * These functions have the opportunity to modify the outgoing request or any response that comes
 * back, as well as block, redirect, or otherwise change the request or response semantics.
 *
 * An `HttpHandlerFn` representing the next interceptor (or the backend which will make a real HTTP
 * request) is provided. Most interceptors will delegate to this function, but that is not required
 * (see `HttpHandlerFn` for more details).
 *
 * @see [HTTP Guide](guide/http/interceptors)
 *
 * @usageNotes
 * Here is a noop interceptor that passes the request through without modifying it:
 * ```ts
 * export const noopInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
 * HttpHandlerFn) => {
 *   return next(modifiedReq);
 * };
 * ```
 *
 * If you want to alter a request, clone it first and modify the clone before passing it to the
 * `next()` handler function.
 *
 * Here is a basic interceptor that adds a bearer token to the headers
 * ```ts
 * export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
 * HttpHandlerFn) => {
 *    const userToken = 'MY_TOKEN'; const modifiedReq = req.clone({
 *      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
 *    });
 *
 *    return next(modifiedReq);
 * };
 * ```
 */
export type HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => Observable<HttpEvent<unknown>>;

/**
 * Function which invokes an HTTP interceptor chain.
 *
 * Each interceptor in the interceptor chain is turned into a `ChainedInterceptorFn` which closes
 * over the rest of the chain (represented by another `ChainedInterceptorFn`). The last such
 * function in the chain will instead delegate to the `finalHandlerFn`, which is passed down when
 * the chain is invoked.
 *
 * This pattern allows for a chain of many interceptors to be composed and wrapped in a single
 * `HttpInterceptorFn`, which is a useful abstraction for including different kinds of interceptors
 * (e.g. legacy class-based interceptors) in the same chain.
 */
export type ChainedInterceptorFn<RequestT> = (
  req: HttpRequest<RequestT>,
  finalHandlerFn: HttpHandlerFn,
) => Observable<HttpEvent<RequestT>>;

export function interceptorChainEndFn(
  req: HttpRequest<any>,
  finalHandlerFn: HttpHandlerFn,
): Observable<HttpEvent<any>> {
  return finalHandlerFn(req);
}

/**
 * Constructs a `ChainedInterceptorFn` which adapts a legacy `HttpInterceptor` to the
 * `ChainedInterceptorFn` interface.
 */
export function adaptLegacyInterceptorToChain(
  chainTailFn: ChainedInterceptorFn<any>,
  interceptor: HttpInterceptor,
): ChainedInterceptorFn<any> {
  return (initialRequest, finalHandlerFn) =>
    interceptor.intercept(initialRequest, {
      handle: (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn),
    });
}

/**
 * Constructs a `ChainedInterceptorFn` which wraps and invokes a functional interceptor.
 *
 * Note: Angular's implementation runs the interceptor inside an `EnvironmentInjector` via
 * `runInInjectionContext()`. Since `@gradii/http-client` is DI-free, the interceptor is invoked
 * directly.
 */
export function chainedInterceptorFn(
  chainTailFn: ChainedInterceptorFn<unknown>,
  interceptorFn: HttpInterceptorFn,
): ChainedInterceptorFn<unknown> {
  return (initialRequest, finalHandlerFn) =>
    interceptorFn(initialRequest, (downstreamRequest) =>
      chainTailFn(downstreamRequest, finalHandlerFn),
    );
}

/**
 * Wraps an array of legacy class-based `HttpInterceptor`s into a single `HttpInterceptorFn` so
 * they can participate in a chain alongside functional interceptors.
 */
export function legacyInterceptorFnFactory(
  interceptors: readonly HttpInterceptor[],
): HttpInterceptorFn {
  let chain: ChainedInterceptorFn<any> | null = null;

  return (req, handler) => {
    if (chain === null) {
      // Note: interceptors are wrapped right-to-left so that final execution order is
      // left-to-right. That is, if `interceptors` is the array `[a, b, c]`, we want to
      // produce a chain that is conceptually `c(b(a(end)))`, which we build from the inside
      // out.
      chain = interceptors.reduceRight(
        adaptLegacyInterceptorToChain,
        interceptorChainEndFn as ChainedInterceptorFn<any>,
      );
    }
    return chain(req, handler);
  };
}
