/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isArrayLike } from './is-array-like';
import { isObjectLike } from './is-object-like';

/**
 * This method is like `isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * isArrayLikeObject([1, 2, 3])
 * // => true
 *
 * isArrayLikeObject(document.body.children)
 * // => true
 *
 * isArrayLikeObject('abc')
 * // => false
 *
 * isArrayLikeObject(Function)
 * // => false
 */
export function isArrayLikeObject(value: any): value is ArrayLike<any> {
  return isObjectLike(value) && isArrayLike(value);
}


