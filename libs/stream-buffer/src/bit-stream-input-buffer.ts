/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */
/* tslint:disable:no-bitwise */

import { StreamInputBuffer } from './stream-input-buffer';

export class BitStreamInputBuffer {
  static bitsRead: number = 0;

  nBit: number = 0;

  private curByte: number = 0;

  private nextByte: number = 0;

  public constructor(private is: StreamInputBuffer) {
    this.curByte = is.readUInt8();
    this.nextByte = is.readUInt8();
  }

  public readBool(): boolean {
    return this.read1Bit() === 1;
  }

  public read1Bit(): number {
    if (this.nBit === 8) {
      this.advance();
      if (this.curByte === -1) {
        return -1;
      }
    }
    let res: number = (this.curByte >> (7 - this.nBit)) & 1;
    this.nBit++;
    return res;
  }

  public readNBit(n: number): number {
    if (n > 64) {
      throw new Error('Can not readByte more then 64 bit');
    }
    let val: number = 0;
    for (let i: number = 0; i < n; i++) {
      {
        val <<= 1;
        val |= this.read1Bit();
      }
    }
    return val;
  }

  public readByte(): number {
    if (this.nBit > 0) {
      this.advance();
    }
    let res: number = this.curByte;
    this.advance();
    return res;
  }

  public moreRBSPData(): boolean {
    if (this.nBit === 8) {
      this.advance();
    }
    let tail: number = 1 << (8 - this.nBit - 1);
    let mask: number = ((tail << 1) - 1);
    let hasTail: boolean = (this.curByte & mask) === tail;
    return !(this.curByte === -1 || (this.nextByte === -1 && hasTail));
  }

  public readRemainingByte(): number {
    return this.readNBit(8 - this.nBit);
  }

  public peakNextBits(n: number): number {
    if (n > 8) {
      throw new Error('N should be less then 8');
    }
    if (this.nBit === 8) {
      this.advance();
      if (this.curByte === -1) {
        return -1;
      }
    }
    let bits: Uint8Array = new Uint8Array(16 - this.nBit);
    let cnt: number = 0;
    for (let i = this.nBit; i < 8; i++) {
      bits[cnt++] = (this.curByte >> (7 - i)) & 1;
    }
    for (let i = 0; i < 8; i++) {
      bits[cnt++] = (this.nextByte >> (7 - i)) & 1;
    }
    let result: number = 0;
    for (let i: number = 0; i < n; i++) {
      result <<= 1;
      result |= bits[i];
    }
    return result;
  }

  public isByteAligned(): boolean {
    return (this.nBit % 8) === 0;
  }

  public close() {
  }

  public getCurBit(): number {
    return this.nBit;
  }

  public remainingBits(): number {
    return this.is.getLength() * 8 - this.nBit;
  }

  private advance() {
    this.curByte = this.nextByte;
    this.nextByte = this.is.readUInt8();
    this.nBit = 0;
  }
}
