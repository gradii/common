/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketSerialize {

  constructor() {
  }

  serialize(data: any) {
    return JSON.stringify(data);
  }

  deserialize(data: string) {
    return JSON.parse(data) as any;
  }
}
