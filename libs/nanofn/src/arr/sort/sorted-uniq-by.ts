/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { baseSortedUniq } from './_internal/base-sorted-uniq';

/**
 * This method is like `uniqBy` except that it's designed and optimized
 * for sorted arrays.
 *
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor)
 * // => [1.1, 2.3]
 */
export function sortedUniqBy(array, iteratee) {
  return (array != null && array.length)
    ? baseSortedUniq(array, iteratee)
    : [];
}


