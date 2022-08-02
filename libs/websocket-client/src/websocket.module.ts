/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { NgModule } from '@angular/core';
import { WebsocketClient } from './websocket-client';


@NgModule({
  providers: [
    WebsocketClient
  ]
})
export class WebsocketModule {

  static forRoot() {
    return {
      ngModule: WebsocketModule,
    };
  }

}
