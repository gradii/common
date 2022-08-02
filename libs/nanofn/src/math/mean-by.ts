/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseSum } from '../_internal/base-sum';

/** Used as references for various `Number` constants. */
const NAN = 0 / 0;

/**
 * This method is like `mean` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be averaged.
 * The iteratee is invoked with one argument: (value).
 *
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {number} Returns the mean.
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * meanBy(objects, ({ n }) => n)
 * // => 5
 */
export function meanBy(array: any[], iteratee: (value: any) => number): number {
  const length = array == null ? 0 : array.length;
  return length ? (_baseSum(array, iteratee) / length) : NAN;
}


