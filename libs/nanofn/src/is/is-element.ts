/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isObjectLike } from './is-object-like';
import { isPlainObject } from './is-plain-object';

/**
 * Checks if `value` is likely a DOM element.
 *
 * @category Lang
 * @param {*} val The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * isElement(document.body)
 * // => true
 *
 * isElement('<body>')
 * // => false
 */
export function isElement(val: any): val is Element {
  return isObjectLike(val) && (val as Element).nodeType === 1 && !isPlainObject(val);
}


