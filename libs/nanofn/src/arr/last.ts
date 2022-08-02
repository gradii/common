/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Gets the last element of `array`.
 *
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * last([1, 2, 3])
 * // => 3
 */
export function last(array: any[]): any {
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}


