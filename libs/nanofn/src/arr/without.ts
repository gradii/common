/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseDifference } from '../_internal/base-difference';
import { isArrayLikeObject } from '../is/is-array-like-object';

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `pull`, this method returns a new array.
 *
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see difference, union, unionBy, unionWith, xor, xorBy, xorWith
 * @example
 *
 * without([2, 1, 2, 3], 1, 2)
 * // => [3]
 */
export function without(array, ...values) {
  return isArrayLikeObject(array) ? _baseDifference(array, values) : [];
}


