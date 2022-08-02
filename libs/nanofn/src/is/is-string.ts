/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getTag } from '../_internal/get-tag';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @category Lang
 * @param {*} val The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 */
export function isString(val: any): val is string {
  const type = typeof val;
  return type === 'string' ||
    (
      type === 'object' &&
      val != null &&
      !Array.isArray(val) && _getTag(val) == '[object String]'
    );
}


