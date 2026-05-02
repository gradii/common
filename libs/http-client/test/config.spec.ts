/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Observable } from 'rxjs';
import { HttpBackend } from '../src/lib/backend';
import { createHttpClient } from '../src/lib/provider';
import { HttpRequest } from '../src/lib/request';
import { HttpEvent, HttpEventType, HttpResponse } from '../src/lib/response';

describe('createHttpClient', () => {
  it('uses the provided backend', (done) => {
    const backend: HttpBackend = {
      handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return new Observable((observer) => {
          const response = new HttpResponse({
            url   : request.url,
            body  : { code: 0, msg: 'success', data: {} },
            status: 200,
          });

          observer.next({ type: HttpEventType.Sent });
          observer.next(response);
          observer.complete();
        });
      },
    };

    const client = createHttpClient({ backend });

    client.get('/test').subscribe((res) => {
      expect((res as any)['msg']).toEqual('success');
      done();
    });
  });

  it('runs functional interceptors in order', (done) => {
    const calls: string[]      = [];
    const backend: HttpBackend = {
      handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return new Observable((observer) => {
          calls.push(`backend:${request.headers.get('x-trace')}`);
          observer.next({ type: HttpEventType.Sent });
          observer.next(new HttpResponse({ url: request.url, body: { ok: true }, status: 200 }));
          observer.complete();
        });
      },
    };

    const client = createHttpClient({
      backend,
      interceptors: [
        (req, next) => {
          calls.push('a:before');
          return next(
            req.clone({
              headers: req.headers.set('x-trace', `${req.headers.get('x-trace') ?? ''}a`),
            }),
          );
        },
        (req, next) => {
          calls.push('b:before');
          return next(
            req.clone({
              headers: req.headers.set('x-trace', `${req.headers.get('x-trace') ?? ''}b`),
            }),
          );
        },
      ],
    });

    client.get('/test').subscribe(() => {
      expect(calls).toEqual(['a:before', 'b:before', 'backend:ab']);
      done();
    });
  });
});
