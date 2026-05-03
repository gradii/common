/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {
  CookieSource,
  createXsrfInterceptor,
  FetchBackend,
  HttpBackend,
  HttpClient,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpInterceptorHandler,
  HttpRequest,
  HttpEvent,
  HttpXhrBackend,
  HttpXsrfCookieExtractor,
  HttpXsrfTokenExtractor,
  XSRF_DEFAULT_COOKIE_NAME,
  XSRF_DEFAULT_HEADER_NAME,
  legacyInterceptorFnFactory,
} from '@gradii/http-client';
import { DynamicModule, Inject, Injectable, Module, Optional } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  HTTP_INTERCEPTORS,
  NoopInterceptor,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME,
  XSRF_COOKIE_SOURCE,
} from './token';

/**
 * An injectable `HttpHandler` that applies multiple interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * The interceptors are loaded lazily from the injector, to allow
 * interceptors to themselves inject classes depending indirectly
 * on `HttpInterceptingHandler` itself.
 * @see `HttpInterceptor`
 */
@Injectable()
export class HttpInterceptingHandler implements HttpHandler {
  private chain: HttpHandler | null = null;

  constructor(
    private backend: HttpBackend,
    @Inject(HTTP_INTERCEPTORS)
    @Optional()
    private interceptors: HttpInterceptor[] = [],
  ) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = this.interceptors || [];
      // Wrap legacy class-based interceptors into a single functional interceptor and feed that
      // chain to the new `HttpInterceptorHandler`.
      const legacyFn: HttpInterceptorFn = legacyInterceptorFnFactory(interceptors);
      this.chain                        = new HttpInterceptorHandler(this.backend, [legacyFn]);
    }
    return this.chain.handle(req);
  }
}

/**
 * Constructs an `HttpHandler` that applies interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * Use as a factory function within `HttpClientModule`.
 */
export function interceptingHandler(
  backend: HttpBackend,
  interceptors: HttpInterceptor[] | null = [],
): HttpHandler {
  if (!interceptors || interceptors.length === 0) {
    return backend;
  }
  return new HttpInterceptorHandler(backend, [legacyInterceptorFnFactory(interceptors)]);
}

/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function jsonpCallbackContext(): Object {
  if (typeof window === 'object') {
    return window;
  }
  return {};
}

/**
 * Class-based wrapper around the functional `createXsrfInterceptor`.
 *
 * Kept as a class so that it can be registered as a `HTTP_INTERCEPTORS` provider in NestJS
 * modules.
 */
@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  private readonly fn: HttpInterceptorFn;

  constructor(tokenService: HttpXsrfTokenExtractor, headerName: string) {
    this.fn = createXsrfInterceptor({ tokenExtractor: tokenService, headerName });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.fn(req, (downstreamRequest) => next.handle(downstreamRequest)) as Observable<
      HttpEvent<any>
    >;
  }
}

/**
 * Configures XSRF protection support for outgoing requests.
 *
 * For a server that supports a cookie-based XSRF protection system,
 * use directly to configure XSRF protection with the correct
 * cookie and header names.
 *
 * If no names are supplied, the default cookie name is `XSRF-TOKEN`
 * and the default header name is `X-XSRF-TOKEN`.
 *
 * @publicApi
 */
@Module({
  providers: [
    {
      provide   : HttpXsrfInterceptor,
      useFactory: (tokenService: HttpXsrfTokenExtractor, headerName: string) =>
        new HttpXsrfInterceptor(tokenService, headerName),
      inject    : [HttpXsrfTokenExtractor, XSRF_HEADER_NAME],
    },
    {
      provide   : HTTP_INTERCEPTORS,
      useFactory: (clz: HttpInterceptor, interceptors: HttpInterceptor[] = []) => [
        clz,
        ...interceptors,
      ],
      inject    : [HttpXsrfInterceptor, { token: HTTP_INTERCEPTORS, optional: true }],
    },
    {
      provide   : HttpXsrfCookieExtractor,
      useFactory: (source: CookieSource, cookieName: string) =>
        new HttpXsrfCookieExtractor(source, cookieName),
      inject    : [XSRF_COOKIE_SOURCE, XSRF_COOKIE_NAME],
    },
    { provide: HttpXsrfTokenExtractor, useExisting: HttpXsrfCookieExtractor },
    { provide: XSRF_COOKIE_NAME, useValue: XSRF_DEFAULT_COOKIE_NAME },
    { provide: XSRF_HEADER_NAME, useValue: XSRF_DEFAULT_HEADER_NAME },
    { provide: XSRF_COOKIE_SOURCE, useValue: { cookie: '' } as CookieSource },
  ],
  exports  : [
    HttpXsrfInterceptor,
    HttpXsrfTokenExtractor,
    HttpXsrfCookieExtractor,
    HTTP_INTERCEPTORS,
    XSRF_COOKIE_NAME,
    XSRF_HEADER_NAME,
    XSRF_COOKIE_SOURCE,
  ],
})
export class HttpClientXsrfModule {
  /**
   * Disable the default XSRF protection.
   */
  static disable(): DynamicModule {
    return {
      module   : HttpClientXsrfModule,
      providers: [{ provide: HttpXsrfInterceptor, useClass: NoopInterceptor }],
    };
  }

  /**
   * Configure XSRF protection.
   * @param options An object that can specify either or both
   * cookie name or header name.
   * - Cookie name default is `XSRF-TOKEN`.
   * - Header name default is `X-XSRF-TOKEN`.
   */
  static withOptions(
    options: {
      cookieName?: string;
      headerName?: string;
    } = {},
  ): DynamicModule {
    return {
      module   : HttpClientXsrfModule,
      providers: [
        options.cookieName ? { provide: XSRF_COOKIE_NAME, useValue: options.cookieName } : null,
        options.headerName ? { provide: XSRF_HEADER_NAME, useValue: options.headerName } : null,
      ].filter((it): it is { provide: any; useValue: string } => !!it),
    };
  }
}

/**
 * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
 * with supporting services for XSRF. Automatically imported by `HttpClientModule`.
 *
 * You can add interceptors to the chain behind `HttpClient` by binding them to the
 * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
 *
 * @publicApi
 */
@Module({
  /**
   * Optional configuration for XSRF protection.
   */
  imports: [
    HttpClientXsrfModule.withOptions({
      cookieName: XSRF_DEFAULT_COOKIE_NAME,
      headerName: XSRF_DEFAULT_HEADER_NAME,
    }),
  ],
  /**
   * Configures the [dependency injector](guide/glossary#injector) where it is imported
   * with supporting services for HTTP communications.
   */
  providers: [
    {
      provide   : HttpClient,
      useFactory: (handler: HttpHandler) => new HttpClient(handler),
      inject    : [HttpHandler],
    },
    { provide: HttpHandler, useClass: HttpInterceptingHandler },
    FetchBackend,
    { provide: HttpXhrBackend, useExisting: FetchBackend },
    { provide: HttpBackend, useExisting: FetchBackend },
  ],
  exports  : [HttpClient],
})
export class HttpClientModule {}
