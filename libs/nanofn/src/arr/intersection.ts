/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { map } from './map';
import { _baseIntersection } from '../_internal/base-intersection';
import { _castArrayLikeObject } from '../_internal/cast-array-like-object';

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * intersection([2, 1], [2, 3])
 * // => [2]
 */
export function intersection(...arrays) {
  const mapped = map(arrays, _castArrayLikeObject);
  return (mapped.length && mapped[0] === arrays[0])
    ? _baseIntersection(mapped)
    : [];
}
