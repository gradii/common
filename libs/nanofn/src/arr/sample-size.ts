/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { copyArray } from './_internal/copy-array';
import { slice } from './slice';

/**
 * Gets `n` random elements at unique keys from `array` up to the
 * size of `array`.
 *
 * @category Array
 * @param {Array} array The array to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * sampleSize([1, 2, 3], 2)
 * // => [3, 1]
 *
 * sampleSize([1, 2, 3], 4)
 * // => [2, 3, 1]
 */
export function sampleSize(array, n) {
  n = n == null ? 1 : n;
  const length = array == null ? 0 : array.length;
  if (!length || n < 1) {
    return [];
  }
  n = n > length ? length : n;
  let index = -1;
  const lastIndex = length - 1;
  const result = copyArray(array);
  while (++index < n) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return slice(result, 0, n);
}


