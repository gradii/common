/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getTag } from '../_internal/get-tag';
import { isObjectLike } from './is-object-like';

/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @category Lang
 * @param {*} val The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
 * @example
 *
 * isWeakSet(new WeakSet)
 * // => true
 *
 * isWeakSet(new Set)
 * // => false
 */
export function isWeakSet(val: unknown): val is WeakSet<unknown> {
  return isObjectLike(val) && _getTag(val) == '[object WeakSet]';
}


