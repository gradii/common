/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { baseSortedUniq } from './_internal/base-sorted-uniq';

/**
 * This method is like `uniq` except that it only works
 * for sorted arrays.
 * If the input array is known to be sorted `sortedUniq` is
 * faster than `uniq`.
 *
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * sortedUniq([1, 1, 2])
 * // => [1, 2]
 */
export function sortedUniq(array) {
  return (array != null && array.length)
    ? baseSortedUniq(array)
    : [];
}


