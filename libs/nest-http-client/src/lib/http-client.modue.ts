/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  HttpBackend, HttpClient, HttpEvent, HttpFetchBackend, HttpHandler, HttpInterceptor, HttpInterceptorHandler, HttpRequest,
  HttpXhrBackend, HttpXsrfCookieExtractor, HttpXsrfInterceptor, HttpXsrfTokenExtractor
} from '@gradii/http-client';
import { DynamicModule, Inject, Injectable, Module, Optional } from '@nestjs/common';
// import { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS, NoopInterceptor, XSRF_COOKIE_NAME, XSRF_HEADER_NAME } from './token';

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

  constructor(private backend: HttpBackend,
              @Inject(HTTP_INTERCEPTORS)
              @Optional()
              private interceptors: any[] = []) {
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = this.interceptors || [];
      this.chain         = interceptors.reduceRight(
        (next: HttpInterceptorHandler, interceptor: HttpInterceptor) => new HttpInterceptorHandler(next, interceptor),
        this.backend);
    }
    return this.chain.handle(req);
  }
}

/**
 * Constructs an `HttpHandler` that applies interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * Use as a factory function within `HttpClientModule`.
 *
 *
 */
export function interceptingHandler(
  backend: HttpBackend, interceptors: HttpInterceptor[] | null = []): HttpHandler {
  if (!interceptors) {
    return backend;
  }
  return interceptors.reduceRight(
    (next, interceptor) => new HttpInterceptorHandler(next, interceptor), backend);
}

/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 *
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function jsonpCallbackContext(): Object {
  if (typeof window === 'object') {
    return window;
  }
  return {};
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
      useFactory: (tokenService, headerName) => new HttpXsrfInterceptor(tokenService, headerName),
      inject    : [
        HttpXsrfTokenExtractor,
        XSRF_HEADER_NAME
      ]
    },
    {
      provide   : HTTP_INTERCEPTORS,
      useFactory: (clz, interceptors = []) => [
        clz,
        ...interceptors
      ],
      inject    : [
        HttpXsrfInterceptor,
        {token: HTTP_INTERCEPTORS, optional: true},
      ]
    },
    {
      provide: HttpXsrfCookieExtractor, useFactory: () => new HttpXsrfCookieExtractor(null, 'server', null)
    },
    {provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor},
    {provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN'},
    {provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN'},
  ],
})
export class HttpClientXsrfModule {
  /**
   * Disable the default XSRF protection.
   */
  static disable(): DynamicModule/*<HttpClientXsrfModule>*/ {
    return {
      module   : HttpClientXsrfModule,
      providers: [
        {provide: HttpXsrfInterceptor, useClass: NoopInterceptor},
      ],
    };
  }

  /**
   * Configure XSRF protection.
   * @param options An object that can specify either or both
   * cookie name or header name.
   * - Cookie name default is `XSRF-TOKEN`.
   * - Header name default is `X-XSRF-TOKEN`.
   *
   */
  static withOptions(options: {
    cookieName?: string,
    headerName?: string,
  } = {}): DynamicModule/*<HttpClientXsrfModule>*/ {
    return {
      module   : HttpClientXsrfModule,
      providers: [
        options.cookieName ? {provide: XSRF_COOKIE_NAME, useValue: options.cookieName} : null,
        options.headerName ? {provide: XSRF_HEADER_NAME, useValue: options.headerName} : null,
      ].filter(it => !!it),
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
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  /**
   * Configures the [dependency injector](guide/glossary#injector) where it is imported
   * with supporting services for HTTP communications.
   */
  providers: [
    {
      provide   : HttpClient,
      useFactory: (interceptors = [], httpBackend) => new HttpClient(interceptors, httpBackend),
      inject    : [
        {token: HTTP_INTERCEPTORS, optional: true},
        HttpBackend
      ]
    },
    {provide: HttpHandler, useClass: HttpInterceptingHandler},
    {provide: HttpXhrBackend, useExisting: HttpFetchBackend},
    HttpFetchBackend,
    {provide: HttpBackend, useExisting: HttpFetchBackend},
  ],
  exports: [
    HttpClient
  ]
})
export class HttpClientModule {
}

// /**
//  * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
//  * with supporting services for JSONP.
//  * Without this module, Jsonp requests reach the backend
//  * with method JSONP, where they are rejected.
//  *
//  * You can add interceptors to the chain behind `HttpClient` by binding them to the
//  * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
//  *
//  * @publicApi
//  */
// @NgModule({
//   providers: [
//     JsonpClientBackend,
//     {provide: JsonpCallbackContext, useFactory: jsonpCallbackContext},
//     {provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true},
//   ],
// })
// export class HttpClientJsonpModule {
// }
