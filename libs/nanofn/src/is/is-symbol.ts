/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getTag } from '../_internal/get-tag';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @category Lang
 * @param {*} val The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
export function isSymbol(val: any): val is symbol {
  const type = typeof val;
  return type == 'symbol' || (type === 'object' && val != null && _getTag(
    val) == '[object Symbol]');
}


