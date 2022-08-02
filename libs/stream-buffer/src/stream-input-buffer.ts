/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/* tslint:disable:no-bitwise */

export class StreamInputBuffer {
  private offset: number = 0;

  /**
   * A buffer walker.
   * @param buffer Array buffer.
   * @param bigEndian Use big endian for numbers. (default: little endian)
   */
  constructor(public buffer: Buffer) {
  }

  public get position() {
    return this.offset;
  }

  /**
   * Returns the array buffer of the data view.
   * @return The buffer of this data view.
   */
  public getBuffer(): Buffer {
    const buffer = new Buffer(this.offset);
    this.buffer.copy(buffer, 0, 0, this.offset);
    return buffer;
  }

  /**
   * Returns the length in bytes of this stream buffer.
   */
  public getLength(): number {
    return this.buffer.byteLength;
  }

  /**
   * Moves the offset relative in a direction.
   * @param length Positive or negative number byte length.
   */
  public skip(length: number): void {
    this.offset += length;
  }

  /**
   * Moves the offset to zero.
   */
  public resetOffset(): void {
    this.offset = 0;
  }

  /**
   * Returns the current offset.
   * @return Offset
   */
  public getOffset(): number {
    return this.offset;
  }

  /**
   * Sets a new offset to an absolute position.
   * @param offset New offset (starts from zero)
   */
  public setOffset(offset: number): void {
    this.offset = offset;
  }

  public read(length: number): Buffer {
    const value = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;
    return value;
  }

  public readString(length: number, encoding?: BufferEncoding): string {
    const value = this.buffer.toString(encoding, this.offset, this.offset + length);
    this.offset += length;
    return value;
  }

  // public readHex(length: number, space = false): string {
  //   if (space) {
  //     let rtn = this.buffer.toString('hex', this.offset, ++this.offset)
  //     for (let i = 1; i < length; i++) {
  //       rtn += ' ' + this.buffer.toString('hex', this.offset, ++this.offset)
  //     }
  //     return rtn;
  //   }
  //
  //   return this.buffer.toString('hex', this.offset, this.offset + length);
  // }

  /**
   * Reads the next 8-bit singed integer from current offset.
   * @return INT8 value.
   */
  public readInt8(): number {
    const value = this.buffer.readInt8(this.offset);
    this.offset += 1;
    return value;
  }

  /**
   * Reads the next 8-bit unsinged integer from curret offset.
   * @return UINT8 value.
   */
  public readUInt8(): number {
    const value = this.buffer.readUInt8(this.offset);
    this.offset += 1;
    return value;
  }

  /**
   * Reads the next 16-bit singed integer.
   * @return INT16 value.
   */
  public readInt16BE(): number {
    const value = this.buffer.readInt16BE(this.offset);
    this.offset += 2;
    return value;
  }

  public readInt16LE(): number {
    const value = this.buffer.readInt16LE(this.offset);
    this.offset += 2;
    return value;
  }

  /**
   * Reads the next 16-bit unsinged integer.
   * @return UINT16 value.
   */
  public readUInt16BE(): number {
    const value = this.buffer.readUInt16BE(this.offset);
    this.offset += 2;
    return value;
  }

  public readUInt16LE(): number {
    const value = this.buffer.readUInt16LE(this.offset);
    this.offset += 2;
    return value;
  }

  /**
   * Reads the next 32-bit singed integer.
   * @return INT32 value.
   */
  public readInt32BE(): number {
    const value = this.buffer.readInt32BE(this.offset);
    this.offset += 4;
    return value;
  }

  public readInt32LE(): number {
    const value = this.buffer.readInt32LE(this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Reads the next 32-bit unsinged integer.
   * @return UINT32 value.
   */
  public readUInt32BE(): number {
    const value = this.buffer.readUInt32BE(this.offset);
    this.offset += 4;
    return value;
  }

  public readUInt32LE(): number {
    const value = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Reads the next 64-bit singed integer.
   * @return INT64 value.
   */
  public readBigInt64BE(): bigint {
    const value = this.buffer.readBigInt64BE(this.offset);
    this.offset += 8;
    return value;
  }

  public readBigInt64LE(): bigint {
    const value = this.buffer.readBigInt64LE(this.offset);
    this.offset += 8;
    return value;
  }

  /**
   * Reads the next 64-bit unsinged integer.
   * @return UINT64 value.
   */
  public readBigUInt64BE(): bigint {
    const value = this.buffer.readBigUInt64BE(this.offset);
    this.offset += 8;
    return value;
  }

  public readBigUInt64LE(): bigint {
    const value = this.buffer.readBigUInt64LE(this.offset);
    this.offset += 8;
    return value;
  }

  /**
   * Reads the next float. (32-bit, signed)
   * @return FLOAT value.
   */
  public readFloatBE(): number {
    const value = this.buffer.readFloatBE(this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Reads the next double. (32-bit, signed)
   * @return DOUBLE value.
   */
  public readFloatLE(): number {
    const value = this.buffer.readFloatLE(this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Reads the next double. (64-bit, signed)
   * @return FLOAT value.
   */
  public readDoubleBE(): number {
    const value = this.buffer.readDoubleBE(this.offset);
    this.offset += 8;
    return value;
  }

  /**
   * Reads the next double. (64-bit, signed)
   * @return DOUBLE value.
   */
  public readDoubleLE(): number {
    const value = this.buffer.readDoubleLE(this.offset);
    this.offset += 8;
    return value;
  }

  public readIntBE(length: number): number {
    const value = this.buffer.readIntBE(this.offset, length);
    this.offset += length;
    return value;
  }

  public readIntLE(length: number): number {
    const value = this.buffer.readIntLE(this.offset, length);
    this.offset += length;
    return value;
  }

  public readUIntBE(length: number): number {
    const value = this.buffer.readUIntBE(this.offset, length);
    this.offset += length;
    return value;
  }

  public readUIntLE(length: number): number {
    const value = this.buffer.readUIntLE(this.offset, length);
    this.offset += length;
    return value;
  }

}
