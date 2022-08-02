/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Gets a random element from `array`.
 *
 * @category Array
 * @param {Array} array The array to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * sample([1, 2, 3, 4])
 * // => 2
 */
export function sample(array) {
  const length = array == null ? 0 : array.length;
  return length ? array[Math.floor(Math.random() * length)] : undefined;
}


