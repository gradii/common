/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseUniq } from '../../_internal/base-uniq';

/**
 * This method is like `uniq` except that it accepts `comparator` which
 * is invoked to compare elements of `array`. The order of result values is
 * determined by the order they occur in the array. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @see uniq, uniqBy
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * uniqWith(objects, isEqual)
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 */
export function uniqWith(array, comparator) {
  comparator = typeof comparator === 'function' ? comparator : undefined;
  return (array != null && array.length)
    ? _baseUniq(array, undefined, comparator)
    : [];
}


