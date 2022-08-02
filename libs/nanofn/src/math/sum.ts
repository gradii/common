/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseSum } from '../_internal/base-sum';

/**
 * Computes the sum of the values in `array`.
 *
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * sum([4, 2, 8, 6])
 * // => 20
 */
export function sum(array) {
  return (array != null && array.length)
    ? _baseSum(array, (value) => value)
    : 0;
}


