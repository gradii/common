/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Gets the first element of `array`.
 *
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @see last
 * @example
 *
 * head([1, 2, 3])
 * // => 1
 *
 * head([])
 * // => undefined
 */
export function head(array) {
  return (array != null && array.length)
    ? array[0]
    : undefined;
}


