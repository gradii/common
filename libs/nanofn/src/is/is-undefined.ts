/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Checks if `value` is `undefined`.
 *
 * @category Lang
 * @param {*} val The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * isUndefined(void 0)
 * // => true
 *
 * isUndefined(null)
 * // => false
 */
export function isUndefined(val: any): val is undefined {
  return val === undefined;
}


