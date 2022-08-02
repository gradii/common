/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Gets all but the first element of `array`.
 *
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * tail([1, 2, 3])
 * // => [2, 3]
 */
export function tail(array) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  const [, ...result] = array;
  return result;
}


