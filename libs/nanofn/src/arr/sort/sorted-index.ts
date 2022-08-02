/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { baseSortedIndex } from './_internal/base-sorted-index';

/**
 * Uses a binary search to determine the lowest index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * sortedIndex([30, 50], 40)
 * // => 1
 */
export function sortedIndex(array, value) {
  return baseSortedIndex(array, value);
}


