/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { baseFlatten } from './_internal/base-flatten';
import { baseUniq } from './_internal/base-uniq';
import { isArrayLikeObject } from './is-array-like-object';

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @see difference, unionBy, unionWith, without, xor, xorBy
 * @example
 *
 * union([2, 3], [1, 2])
 * // => [2, 3, 1]
 */
export function union(...arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
}


