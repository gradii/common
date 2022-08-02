/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

export class JsonWebsocket {
  private contentLength: number | null = null;
  private isClosed                     = false;
  private buffer                       = '';

  private messageStream$ = new Subject();

  public get netSocket() {
    return this.socket;
  }

  constructor(public socket: WebSocket) {
    this._init();
  }

  _init() {
    if (this.socket.readyState === 1) {
      this.isClosed = false;
    } else if (
      this.socket.readyState === 2 ||
      this.socket.readyState === 3
    ) {
      this.isClosed = true;
    }

    this.socket.onmessage = (evt: MessageEvent) => {
      this.handleMessage(evt.data);
    };

    this.socket.onopen = (evt: Event) => {
      this.isClosed = false;
    };

    this.socket.onclose = () => {
      this.isClosed = true;
      this.messageStream$.complete();
    };

    this.socket.onerror = () => {
      this.isClosed = true;
      this.messageStream$.complete();
    };
  }

  public on<K extends keyof WebSocketEventMap>(event: K, callback: (data?: any) => void) {
    if (event === 'message') {
      this.messageStream$.pipe(
        tap((data) => {
          callback(data);
        })
      ).subscribe();
    } else {
      this.socket.addEventListener(event, (evt: WebSocketEventMap[K]) => {
        callback(evt);
      });
    }
    return this;
  }

  public once<K extends keyof WebSocketEventMap>(event: string, callback: (data?: any) => void) {
    if (event === 'message') {
      this.messageStream$.pipe(
        take(1),
        tap((data) => {
          callback(data);
        })
      ).subscribe();
    } else {
      this.socket.addEventListener(event, (evt: Event) => {
        callback(evt);
      }, {
        once: true
      });
    }

    return this;
  }

  public end() {
    this.socket.close();
    return this;
  }

  public sendMessage(message: any, callback?: (err?: any) => void) {
    if (this.isClosed) {
      if (callback) {
        callback(new Error('NetSocketClosedException'));
      }
      return;
    }

    this.socket.send(JSON.stringify(message));
  }

  private handleMessage(data: string) {
    this.contentLength = null;
    this.buffer        = '';

    let message: Record<string, unknown>;
    try {
      message = JSON.parse(data) as any;
    } catch (e) {
      throw new Error(`InvalidJSONFormatException ${e}, ${data}`);
    }
    message = message || {};
    // this.socket.send(message);
    // this.socket.dispatchEvent(new Mesa)
    this.messageStream$.next(message);
  }
}
