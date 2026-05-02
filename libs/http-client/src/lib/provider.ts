/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { FetchBackend } from './backends/fetch';
import { HttpBackend, HttpInterceptorHandler } from './backend';
import { HttpClient } from './client';
import {
  adaptLegacyInterceptorToChain,
  ChainedInterceptorFn,
  HttpInterceptor,
  HttpInterceptorFn,
  interceptorChainEndFn,
  legacyInterceptorFnFactory,
} from './interceptor';

/**
 * Options accepted by {@link createHttpClient}.
 *
 * This is the DI-free analogue of Angular's `provideHttpClient(...features)` configuration.
 *
 * @publicApi
 */
export interface CreateHttpClientOptions {
  /**
   * Backend used to dispatch requests. Defaults to a {@link FetchBackend} which uses
   * `globalThis.fetch` (Node.js >= 18 has this built in).
   */
  backend?: HttpBackend;
  /**
   * Functional interceptors to install. They run in array order on the request and in
   * reverse order on the response (matching Angular's `withInterceptors([...])`).
   */
  interceptors?: readonly HttpInterceptorFn[];
  /**
   * Legacy class-based interceptors. They are wrapped in an `HttpInterceptorFn` and
   * appended to the chain after the functional interceptors above.
   */
  legacyInterceptors?: readonly HttpInterceptor[];
}

/**
 * Construct a configured `HttpClient` instance.
 *
 * Equivalent to Angular's `provideHttpClient(withInterceptors([...]))`, but for a non-DI
 * environment such as Node.js or NestJS.
 *
 * @publicApi
 */
export function createHttpClient(options: CreateHttpClientOptions = {}): HttpClient {
  const backend             = options.backend ?? new FetchBackend();
  const interceptorFns: HttpInterceptorFn[] = [...(options.interceptors ?? [])];
  if (options.legacyInterceptors && options.legacyInterceptors.length > 0) {
    interceptorFns.push(legacyInterceptorFnFactory(options.legacyInterceptors));
  }

  const handler =
    interceptorFns.length === 0
      ? backend
      : new HttpInterceptorHandler(backend, interceptorFns);

  return new HttpClient(handler);
}

// Re-export internal helpers used when callers need to assemble their own chain.
export { adaptLegacyInterceptorToChain, ChainedInterceptorFn, interceptorChainEndFn };
