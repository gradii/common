/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseUniq } from '../../_internal/base-uniq';

/**
 * This method is like `uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @see uniq, uniqWith
 * @example
 *
 * uniqBy([2.1, 1.2, 2.3], Math.floor)
 * // => [2.1, 1.2]
 */
export function uniqBy(array: any[], iteratee: (value: any) => any): any[] {
  return (array != null && array.length)
    ? _baseUniq(array, iteratee)
    : [];
}


