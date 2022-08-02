/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */
/* tslint:disable:no-bitwise */

export class StreamOutputBuffer {
  private offset: number = 0;
  private capacity: number = 32;
  private buffer: Buffer;

  /**
   * A buffer walker.
   * @param size
   */
  constructor(size?: number) {
    if (size > 0) {
      this.capacity = size;
    }
    this.buffer = new Buffer(this.capacity);
  }

  public get position() {
    return this.offset;
  }

  public getLength() {
    return this.offset;
  }

  public getBuffer(notCopy = false) {
    if (notCopy) {
      if (this.offset !== this.buffer.byteLength) {
        throw new Error(`the buffer length is not equal to written bytes`);
      }
      return this.buffer;
    }
    const buffer = new Buffer(this.offset);
    this.buffer.copy(buffer, 0, 0, this.offset);
    return buffer;
  }

  skip(length: number) {
    this.checkCapacity(length);
    this.offset += length;
  }

  fill(value: string | Uint8Array | number, length: number, encoding?: BufferEncoding) {
    this.checkCapacity(length);
    this.buffer.fill(value, this.offset, length, encoding);
    this.offset += length;
  }

  writeAt(buffer: Buffer, offset = this.offset, sourceStart = 0, sourceEnd = buffer.length) {
    const length = sourceEnd - sourceStart;
    if (offset + length > this.offset) {
      this.checkCapacity(offset + length);
      this.offset = offset + length;
    }
    buffer.copy(this.buffer, offset, sourceStart, sourceEnd);
  }

  /**
   * @param buffer
   * @param sourceStart
   * @param sourceEnd
   */
  write(buffer: Buffer, sourceStart = 0, sourceEnd = buffer.length) {
    const length = sourceEnd - sourceStart;
    this.checkCapacity(length);
    buffer.copy(this.buffer, this.offset, sourceStart, sourceEnd);
    this.offset += length;
  }

  /**
   *
   * @param str
   * @param length
   * @param encoding
   */
  writeString(str: string, length: number, encoding?: BufferEncoding): void {
    this.checkCapacity(length);
    this.buffer.write(str, this.offset, length, encoding);
    this.offset += length;
  }

  writeInt8(value: number): void {
    this.checkCapacity(1);
    this.buffer.writeInt8(value, this.offset);
    this.offset += 1;
  }

  writeUInt8(value: number): void {
    this.checkCapacity(1);
    this.buffer.writeUInt8(value, this.offset);
    this.offset += 1;
  }

  writeInt16BE(value: number): void {
    this.checkCapacity(2);
    this.buffer.writeInt16BE(value, this.offset);
    this.offset += 2;
  }

  writeInt16LE(value: number): void {
    this.checkCapacity(2);
    this.buffer.writeInt16LE(value, this.offset);
    this.offset += 2;
  }

  writeUInt16BE(value: number): void {
    this.checkCapacity(2);
    this.buffer.writeUInt16BE(value, this.offset);
    this.offset += 2;
  }

  writeUInt16LE(value: number): void {
    this.checkCapacity(2);
    this.buffer.writeUInt16LE(value, this.offset);
    this.offset += 2;
  }

  writeInt32BE(value: number): void {
    this.checkCapacity(4);
    this.buffer.writeInt32BE(value, this.offset);
    this.offset += 4;
  }

  writeInt32LE(value: number): void {
    this.checkCapacity(4);
    this.buffer.writeInt32LE(value, this.offset);
    this.offset += 4;
  }

  writeUInt32BE(value: number): void {
    this.checkCapacity(4);
    this.buffer.writeUInt32BE(value, this.offset);
    this.offset += 4;
  }

  writeUInt32LE(value: number): void {
    this.checkCapacity(4);
    this.buffer.writeUInt32LE(value, this.offset);
    this.offset += 4;
  }

  writeBigInt64BE(value: bigint, offset?: number): void {
    this.checkCapacity(8);
    this.buffer.writeBigInt64BE(value, this.offset);
    this.offset += 8;
  }

  writeBigInt64LE(value: bigint, offset?: number): void {
    this.checkCapacity(8);
    this.buffer.writeBigInt64LE(value, this.offset);
    this.offset += 8;
  }

  writeBigUInt64BE(value: bigint, offset?: number): void {
    this.checkCapacity(8);
    this.buffer.writeBigUInt64BE(value, this.offset);
    this.offset += 8;
  }

  writeBigUInt64LE(value: bigint, offset?: number): void {
    this.checkCapacity(8);
    this.buffer.writeBigUInt64LE(value, this.offset);
    this.offset += 8;
  }

  writeFloatBE(value: number): void {
    this.checkCapacity(4);
    this.buffer.writeFloatBE(value, this.offset);
    this.offset += 4;
  }

  writeFloatLE(value: number): void {
    this.checkCapacity(4);
    this.buffer.writeFloatLE(value, this.offset);
    this.offset += 4;
  }

  writeDoubleBE(value: number): void {
    this.checkCapacity(8);
    this.buffer.writeDoubleBE(value, this.offset);
    this.offset += 8;
  }

  writeDoubleLE(value: number): void {
    this.checkCapacity(8);
    this.buffer.writeDoubleLE(value, this.offset);
    this.offset += 8;
  }

  writeIntBE(value: number, byteLength: number): void {
    this.checkCapacity(byteLength);
    this.buffer.writeIntBE(value, this.offset, byteLength);
    this.offset += byteLength;
  }

  writeIntLE(value: number, byteLength: number): void {
    this.checkCapacity(byteLength);
    this.buffer.writeIntLE(value, this.offset, byteLength);
    this.offset += byteLength;
  }

  writeUIntBE(value: number, byteLength: number): void {
    this.checkCapacity(byteLength);
    this.buffer.writeUIntBE(value, this.offset, byteLength);
    this.offset += byteLength;
  }

  writeUIntLE(value: number, byteLength: number): void {
    this.checkCapacity(byteLength);
    this.buffer.writeUIntLE(value, this.offset, byteLength);
    this.offset += byteLength;
  }

  protected checkCapacity(length: number) {
    if (this.offset + length > this.capacity) {
      length = length < 32 ? 32 : length;
      this.capacity = this.capacity + length << 1;
      const buffer = new Buffer(this.capacity);
      this.buffer.copy(buffer);
      this.buffer = buffer;
    }
  }
}
