/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {
  HttpBackend,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@gradii/http-client';
import { lastValueFrom, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';

import {
  HttpInterceptingHandler,
  interceptingHandler,
} from '../src/lib/http-client.modue';
import { HttpInterceptor, NoopInterceptor } from '../src/lib/token';

class CapturingBackend implements HttpBackend {
  lastRequest: HttpRequest<any> | null = null;

  constructor(private readonly responseFactory: (req: HttpRequest<any>) => HttpResponse<any> =
                (req) =>
                  new HttpResponse({
                    url   : req.url,
                    status: HttpStatusCode.Ok,
                    body  : { from: 'backend', method: req.method, url: req.url },
                  })) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    this.lastRequest = req;
    return of(
      { type: HttpEventType.Sent } as HttpEvent<any>,
      this.responseFactory(req) as HttpEvent<any>,
    );
  }
}

class HeaderTaggingInterceptor implements HttpInterceptor {
  constructor(private readonly tag: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const updated = req.clone({
      setHeaders: { 'x-trace': `${req.headers.get('x-trace') ?? ''}${this.tag}` },
    });
    return next.handle(updated);
  }
}

describe('HttpInterceptingHandler', () => {
  it('forwards directly to the backend when no interceptors are provided', async () => {
    const backend = new CapturingBackend();
    const handler = new HttpInterceptingHandler(backend, []);

    const events = await lastValueFrom(
      handler.handle(new HttpRequest('GET', '/data')).pipe(toArray()),
    );
    expect(events.map((e) => e.type)).toEqual([HttpEventType.Sent, HttpEventType.Response]);
    expect(backend.lastRequest!.method).toBe('GET');
    expect(backend.lastRequest!.headers.has('x-trace')).toBe(false);
  });

  it('runs interceptors left-to-right on the outgoing request', async () => {
    const backend = new CapturingBackend();
    const handler = new HttpInterceptingHandler(backend, [
      new HeaderTaggingInterceptor('A'),
      new HeaderTaggingInterceptor('B'),
      new HeaderTaggingInterceptor('C'),
    ]);

    await lastValueFrom(handler.handle(new HttpRequest('GET', '/test')));
    expect(backend.lastRequest!.headers.get('x-trace')).toBe('ABC');
  });

  it('memoizes the chain across requests', async () => {
    const backend = new CapturingBackend();
    let constructions = 0;

    class CountingInterceptor implements HttpInterceptor {
      constructor() {
        constructions++;
      }

      intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req);
      }
    }

    const handler = new HttpInterceptingHandler(backend, [new CountingInterceptor()]);
    await lastValueFrom(handler.handle(new HttpRequest('GET', '/a')));
    await lastValueFrom(handler.handle(new HttpRequest('GET', '/b')));
    await lastValueFrom(handler.handle(new HttpRequest('GET', '/c')));

    // Interceptor instance is created exactly once and reused.
    expect(constructions).toBe(1);
  });

  it('lets an interceptor short-circuit the chain', async () => {
    const backend = new CapturingBackend();

    class ShortCircuitInterceptor implements HttpInterceptor {
      intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return of(
          new HttpResponse({
            url   : req.url,
            status: HttpStatusCode.Ok,
            body  : { cached: true },
          }) as HttpEvent<any>,
        );
      }
    }

    const handler = new HttpInterceptingHandler(backend, [new ShortCircuitInterceptor()]);
    const res = (await lastValueFrom(
      handler.handle(new HttpRequest('GET', '/cached')),
    )) as HttpResponse<{ cached: boolean }>;

    expect(res.body).toEqual({ cached: true });
    expect(backend.lastRequest).toBeNull();
  });
});

describe('interceptingHandler()', () => {
  it('returns the backend itself when no interceptors are passed', () => {
    const backend = new CapturingBackend();
    expect(interceptingHandler(backend)).toBe(backend);
    expect(interceptingHandler(backend, null)).toBe(backend);
    expect(interceptingHandler(backend, [])).toBe(backend);
  });

  it('returns a handler that runs interceptors when supplied', async () => {
    const backend = new CapturingBackend();
    const handler = interceptingHandler(backend, [new HeaderTaggingInterceptor('X')]);

    expect(handler).not.toBe(backend);
    await lastValueFrom(handler.handle(new HttpRequest('GET', '/some-url')));
    expect(backend.lastRequest!.headers.get('x-trace')).toBe('X');
  });
});

describe('NoopInterceptor', () => {
  it('passes the request through unchanged', async () => {
    const backend = new CapturingBackend();
    const handler = new HttpInterceptingHandler(backend, [new NoopInterceptor()]);

    await lastValueFrom(handler.handle(new HttpRequest('POST', '/echo', { hello: 'world' })));
    expect(backend.lastRequest!.method).toBe('POST');
    expect(backend.lastRequest!.body).toEqual({ hello: 'world' });
  });
});
