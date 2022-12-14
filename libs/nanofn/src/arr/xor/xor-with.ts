/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { baseXor } from './_internal/base-xor';
import { isArrayLikeObject } from './is-array-like-object';
import { last } from './last';

/**
 * This method is like `xor` except that it accepts `comparator` which is
 * invoked to compare elements of `arrays`. The order of result values is
 * determined by the order they occur in the arrays. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @see difference, union, unionBy, unionWith, without, xor, xorBy
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * xorWith(objects, others, isEqual)
 * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
export function xorWith(...arrays) {
  let comparator = last(arrays);
  comparator = typeof comparator === 'function' ? comparator : undefined;
  return baseXor(arrays.filter(isArrayLikeObject), undefined, comparator);
}


