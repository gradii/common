/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { slice } from './slice';

/**
 * Gets all but the last element of `array`.
 *
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * initial([1, 2, 3])
 * // => [1, 2]
 */
export function initial(array) {
  const length = array == null ? 0 : array.length;
  return length ? slice(array, 0, -1) : [];
}


