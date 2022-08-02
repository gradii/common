/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

declare const Buffer: any;
declare type Buffer = any;

/**
 * Creates a clone of `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
export function _cloneBuffer(buffer: Buffer, isDeep: boolean): Buffer {
  if (isDeep) {
    return buffer.slice();
  }
  const length = buffer.length;
  const result = Buffer.allocUnsafe(length);

  buffer.copy(result);
  return result;
}


