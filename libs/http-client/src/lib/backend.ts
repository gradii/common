
import { Observable } from 'rxjs';
import { HttpRequest } from './request';
import { HttpEvent } from './response';

export abstract class HttpHandler {
  abstract handle(request: HttpRequest<any>): Observable<HttpEvent<any>>;
}

export abstract class HttpBackend implements HttpHandler {
  abstract handle(request: HttpRequest<any>): Observable<HttpEvent<any>>;
}
