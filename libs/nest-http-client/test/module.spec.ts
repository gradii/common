/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {
  HttpBackend,
  HttpClient,
  HttpHandler,
  HttpResponse,
  HttpStatusCode,
  HttpXhrBackend,
  HttpXsrfCookieExtractor,
  HttpXsrfTokenExtractor,
  XSRF_DEFAULT_COOKIE_NAME,
  XSRF_DEFAULT_HEADER_NAME,
} from '@gradii/http-client';
import { HttpClientTestingBackend } from '@gradii/http-client/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom } from 'rxjs';

import {
  HttpClientModule,
  HttpClientXsrfModule,
  HttpInterceptingHandler,
  HttpXsrfInterceptor,
} from '../src/lib/http-client.modue';
import {
  HTTP_INTERCEPTORS,
  NoopInterceptor,
  XSRF_COOKIE_NAME,
  XSRF_COOKIE_SOURCE,
  XSRF_HEADER_NAME,
} from '../src/lib/token';

describe('HttpClientModule', () => {
  let moduleRef: TestingModule;

  afterEach(async () => {
    await moduleRef?.close();
  });

  it('resolves HttpClient', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [HttpClientModule],
    }).compile();

    const client = moduleRef.get(HttpClient);
    expect(client).toBeInstanceOf(HttpClient);
  });

  it('resolves HttpHandler as HttpInterceptingHandler', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [HttpClientModule],
    }).compile();

    const handler = moduleRef.get(HttpHandler);
    expect(handler).toBeInstanceOf(HttpInterceptingHandler);
  });

  it('aliases HttpBackend and HttpXhrBackend to the same FetchBackend instance', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [HttpClientModule],
    }).compile();

    const backend    = moduleRef.get(HttpBackend);
    const xhrBackend = moduleRef.get(HttpXhrBackend);
    expect(backend).toBe(xhrBackend);
  });

  it('routes a request through the configured backend', async () => {
    const testBackend = new HttpClientTestingBackend();

    moduleRef = await Test.createTestingModule({
      imports: [HttpClientModule],
    })
      .overrideProvider(HttpBackend)
      .useValue(testBackend)
      .compile();

    const client          = moduleRef.get(HttpClient);
    const responsePromise = lastValueFrom(client.get<{ ok: boolean }>('/ping'));

    testBackend.expectOne('/ping').flush({ ok: true });
    await expect(responsePromise).resolves.toEqual({ ok: true });
    testBackend.verify();
  });
});

describe('HttpClientXsrfModule', () => {
  let moduleRef: TestingModule;

  afterEach(async () => {
    await moduleRef?.close();
  });

  it('provides default cookie/header names', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [HttpClientXsrfModule],
    }).compile();

    expect(moduleRef.get(XSRF_COOKIE_NAME)).toBe(XSRF_DEFAULT_COOKIE_NAME);
    expect(moduleRef.get(XSRF_HEADER_NAME)).toBe(XSRF_DEFAULT_HEADER_NAME);
  });

  it('aliases HttpXsrfTokenExtractor to HttpXsrfCookieExtractor and reads tokens from cookies', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [HttpClientXsrfModule],
    })
      .overrideProvider(XSRF_COOKIE_SOURCE)
      .useValue({ cookie: 'XSRF-TOKEN=abc123' })
      .compile();

    const extractor = moduleRef.get(HttpXsrfTokenExtractor);
    expect(extractor).toBeInstanceOf(HttpXsrfCookieExtractor);
    expect(extractor.getToken()).toBe('abc123');
  });

  it('honors custom cookie/header names from withOptions()', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        HttpClientXsrfModule.withOptions({
          cookieName: 'CUSTOM-COOKIE',
          headerName: 'X-Custom-Header',
        }),
      ],
    }).compile();

    expect(moduleRef.get(XSRF_COOKIE_NAME)).toBe('CUSTOM-COOKIE');
    expect(moduleRef.get(XSRF_HEADER_NAME)).toBe('X-Custom-Header');
  });

  it('reads token using the custom cookie name', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [HttpClientXsrfModule.withOptions({ cookieName: 'MY-XSRF' })],
    })
      .overrideProvider(XSRF_COOKIE_SOURCE)
      .useValue({ cookie: 'MY-XSRF=token-from-custom-cookie' })
      .compile();

    const extractor = moduleRef.get(HttpXsrfTokenExtractor);
    expect(extractor.getToken()).toBe('token-from-custom-cookie');
  });

  it('disable() swaps HttpXsrfInterceptor for NoopInterceptor', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [HttpClientXsrfModule.disable()],
    }).compile();

    expect(moduleRef.get(HttpXsrfInterceptor)).toBeInstanceOf(NoopInterceptor);
  });

  it('exposes HTTP_INTERCEPTORS containing HttpXsrfInterceptor by default', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [HttpClientXsrfModule],
    }).compile();

    const interceptors = moduleRef.get(HTTP_INTERCEPTORS) as unknown[];
    expect(Array.isArray(interceptors)).toBe(true);
    expect(interceptors.some((i) => i instanceof HttpXsrfInterceptor)).toBe(true);
  });
});

describe('HttpClientModule + XSRF integration', () => {
  let moduleRef: TestingModule;
  let testBackend: HttpClientTestingBackend;

  beforeEach(async () => {
    testBackend = new HttpClientTestingBackend();
    moduleRef   = await Test.createTestingModule({
      imports: [HttpClientModule],
    })
      .overrideProvider(HttpBackend)
      .useValue(testBackend)
      .overrideProvider(XSRF_COOKIE_SOURCE)
      .useValue({ cookie: 'XSRF-TOKEN=secret-token' })
      .compile();
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('attaches X-XSRF-TOKEN header to mutating requests', async () => {
    const client  = moduleRef.get(HttpClient);
    const promise = lastValueFrom(
      client.post('/api/widgets', { name: 'foo' }, { observe: 'response' }),
    );

    const req = testBackend.expectOne('/api/widgets');
    expect(req.request.headers.get('X-XSRF-TOKEN')).toBe('secret-token');
    req.flush({});
    const res = await promise;
    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res).toBeInstanceOf(HttpResponse);
    testBackend.verify();
  });

  it('does not attach the token to GET requests', async () => {
    const client  = moduleRef.get(HttpClient);
    const promise = lastValueFrom(client.get('/api/widgets'));

    const req = testBackend.expectOne('/api/widgets');
    expect(req.request.headers.has('X-XSRF-TOKEN')).toBe(false);
    req.flush([]);
    await promise;
    testBackend.verify();
  });

  it('does not overwrite an existing X-XSRF-TOKEN header', async () => {
    const client  = moduleRef.get(HttpClient);
    const promise = lastValueFrom(
      client.post('/api/widgets', {}, { headers: { 'X-XSRF-TOKEN': 'caller-supplied' } }),
    );

    const req = testBackend.expectOne('/api/widgets');
    expect(req.request.headers.get('X-XSRF-TOKEN')).toBe('caller-supplied');
    req.flush({});
    await promise;
    testBackend.verify();
  });

  it('skips absolute URLs (cross-origin) when no origin is configured', async () => {
    const client  = moduleRef.get(HttpClient);
    const promise = lastValueFrom(client.post('https://other.example.com/api/widgets', {}));

    const req = testBackend.expectOne('https://other.example.com/api/widgets');
    expect(req.request.headers.has('X-XSRF-TOKEN')).toBe(false);
    req.flush({});
    await promise;
    testBackend.verify();
  });
});
