/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { nanoid } from 'nanoid';
import { defer, fromEvent, merge, Observable, Observer, Subject, throwError as _throw } from 'rxjs';
import {
  concatMap, delay, filter, map, mergeMap, retryWhen, share, take, tap
} from 'rxjs/operators';
import { JsonWebsocket } from './json-websocket';
import { config } from './websocket.config';
import { IWsMessage, WebSocketConfig } from './websocket.interfaces';

// const MESSAGE_EVENT = 'message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketClient implements OnDestroy {

  // public status: Observable<boolean>;
  private config: any;
  // private websocketSub: SubscriptionLike;
  // private statusSub: SubscriptionLike;
  // private reconnection$: Observable<number>;
  // private websocket$: WebSocketSubject<IWsMessage<any>>;
  // private connection$: Observer<boolean>;
  private wsMessages$: Subject<IWsMessage<any>> = new Subject<IWsMessage<any>>();

  private reconnectInterval = 5000;
  private reconnectAttempts = 10;

  private isConnected: boolean;
  private connection: any;

  public socket: JsonWebsocket;
  private routingMap = new Map<string, Function>();

  constructor(
    @Inject(config) private wsConfig: WebSocketConfig
  ) {
    if (wsConfig.reconnectInterval) {
      this.reconnectInterval = wsConfig.reconnectInterval;
    }
    if (wsConfig.reconnectAttempts) {
      this.reconnectAttempts = wsConfig.reconnectAttempts;
    }

    this.config = {
      url: wsConfig.url
    };
  }

  ngOnDestroy() {
    this.wsMessages$.complete();
  }

  /*
  * on message event
  * */
  public on<T>(event: string): Observable<T> {
    return this.wsMessages$.pipe(
      filter((message: IWsMessage<T>) => message.event === event),
      map((message: IWsMessage<T>) => message.data)
    );
  }

  public send<TResult = any, TInput = any>(
    event: string,
    data: TInput,
    hasResponse: boolean = false
  ): Observable<TResult> {
    if (!event) {
      return _throw(new Error('InvalidMessageException'));
    }
    return defer(async () => this.connect()).pipe(
      mergeMap(
        () => new Observable((observer: Observer<TResult>) => {
          const callback = this.createObserver(observer);
          return this.publish({event, data}, callback, hasResponse);
        })
      )
    );
  }

  // public sendRaw(
  //   data: any
  // ) {
  //   // if (isBlank(data)) {
  //   //   // return _throw(new InvalidMessageException());
  //   // }
  //   return defer(async () => this.connect()).pipe(
  //     tap(
  //       () => {
  //         // const serialized = this.serializer.serialize(data);
  //         this.socket.sendMessage(data);
  //       }
  //     )
  //   );
  // }


  // public request() {
  //
  // }


  protected createObserver<T>(
    observer: Observer<T>
  ): (packet: any) => void {
    return ({err, response, isDisposed}: any) => {
      if (err) {
        return observer.error(err);
      } else if (response !== undefined && isDisposed) {
        observer.next(response);
        return observer.complete();
      } else if (isDisposed) {
        return observer.complete();
      }
      observer.next(response);
    };
  }

  protected publish(
    partialPacket: any,
    callback: (packet: any) => any,
    hasResponse: boolean
  ): any {
    try {
      const packet = this.assignPacketId(partialPacket);

      if (hasResponse) {
        this.routingMap.set(packet.id, callback);
      }

      this.socket.sendMessage(packet);

      if (hasResponse) {
        return () => this.routingMap.delete(packet.id);
      } else {
        callback({isDisposed: true});
      }
    } catch (err) {
      callback({err});
    }
  }

  protected assignPacketId(packet: any): any {
    const id = nanoid(10);
    return Object.assign(packet, {id});
  }

  protected createSocket() {
    return new JsonWebsocket(
      new WebSocket(this.config.url)
    );
  }

  bindEvents(socket: JsonWebsocket) {
    socket.on('error', (err: any) => this.handleError(err));
    socket.on('close', () => this.handleClose());
  }

  public handleError(err: any) {
    // this.logger.error(err);
  }

  public handleClose() {
    this.isConnected = false;
    this.connection  = null;
    this.socket      = null;
  }

  public handleResponse(buffer: any): void {
    const {err, data, isDisposed, id, event} = buffer;

    if (event && data) {
      this.wsMessages$.next({data, event});
    }

    const callback = this.routingMap.get(id);
    if (!callback) {
      return undefined;
    }
    if (isDisposed || err) {
      return callback({
        err,
        data,
        isDisposed: true
      });
    }
    callback({
      err,
      data
    });
  }

  public connect(): Promise<any> {
    if (this.connection) {
      return this.connection;
    }
    this.socket = this.createSocket();
    this.bindEvents(this.socket);

    const source$ = this.connect$(this.socket.netSocket).pipe(
      tap(() => {
        this.isConnected = true;
        this.socket.on('message', (buffer: any) =>
          this.handleResponse(buffer)
        );
      }),
      retryWhen(errors => errors.pipe(
        delay(1000), take(10), concatMap((err) => _throw(err)))
      ),
      share()
    );

    // this.socket.connect(this.port, this.host);
    this.connection = source$.toPromise();
    return this.connection;
  }

  protected connect$(
    instance: WebSocket,
    errorEvent: keyof WebSocketEventMap   = 'error',
    connectEvent: keyof WebSocketEventMap = 'open'
  ): Observable<any> {
    const error$   = fromEvent(instance, errorEvent).pipe(
      map((err: any) => {
        throw err;
      })
    );
    const connect$ = fromEvent(instance, connectEvent);
    return merge(error$, connect$).pipe(take(1));
  }

}
