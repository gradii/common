/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/* tslint:disable:no-bitwise */

import { StreamOutputBuffer } from './stream-output-buffer';

export class BitStreamOutputBuffer {
  private curByte: Uint8Array = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

  private curBit: number = 0;

  public constructor(private os: StreamOutputBuffer) {
  }

  public flush() {
    for (let i: number = this.curBit; i < 8; i++) {
      {
        this.curByte[i] = 0;
      }
    }
    this.curBit = 0;
    this.writeCurByte();
  }

  public write1Bit(value: number) {
    if (this.curBit === 8) {
      this.curBit = 0;
      this.writeCurByte();
    }
    this.curByte[this.curBit++] = value;
  }

  public writeBool(value: boolean) {
    this.write1Bit(value ? 1 : 0);
  }

  public writeNBit(value: number, n: number) {
    for (let i: number = 0; i < n; i++) {
      {
        this.write1Bit((<number>(value >> (n - i - 1)) | 0) & 1);
      }
    }
  }

  public writeRemainingZero() {
    this.writeNBit(0, 8 - this.curBit);
  }

  public writeByte(b: number) {
    this.os.writeUInt8(b);
  }

  private writeCurByte() {
    let toWrite: number = (this.curByte[0] << 7) |
      (this.curByte[1] << 6) |
      (this.curByte[2] << 5) |
      (this.curByte[3] << 4) |
      (this.curByte[4] << 3) |
      (this.curByte[5] << 2) |
      (this.curByte[6] << 1) |
      this.curByte[7];
    this.os.writeUInt8(toWrite);
  }

}
