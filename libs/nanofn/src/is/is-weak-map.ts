/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getTag } from '../_internal/get-tag';
import { isObjectLike } from './is-object-like';

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @category Lang
 * @param {*} val The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * isWeakMap(new WeakMap)
 * // => true
 *
 * isWeakMap(new Map)
 * // => false
 */
export function isWeakMap(val: any): val is WeakMap<any, any> {
  return isObjectLike(val) && _getTag(val) == '[object WeakMap]';
}


