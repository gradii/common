/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [arr=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
export function _copyArray(source: any[], arr?: any[]): any[] {
  let index    = -1;
  const length = source.length;

  if (arr === undefined) {
    arr = new Array(length);
  }

  while (++index < length) {
    arr[index] = source[index];
  }
  return arr;
}


