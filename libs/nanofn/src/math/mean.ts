/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { meanBy as baseMean } from './mean-by';

/**
 * Computes the mean of the values in `array`.
 *
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the mean.
 * @example
 *
 * mean([4, 2, 8, 6])
 * // => 5
 */
export function mean(array) {
  return baseMean(array, (value) => value);
}


