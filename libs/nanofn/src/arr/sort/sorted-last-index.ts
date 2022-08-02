/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { baseSortedIndex } from './_internal/base-sorted-index';

/**
 * This method is like `sortedIndex` except that it returns the highest
 * index at which `value` should be inserted into `array` in order to
 * maintain its sort order.
 *
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * sortedLastIndex([4, 5, 5, 5, 6], 5)
 * // => 4
 */
export function sortedLastIndex(array, value) {
  return baseSortedIndex(array, value, true);
}


