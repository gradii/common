/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseClone } from '../_internal/base-clone';

/** Used to compose bitmasks for cloning. */
const CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `clone` except that it accepts `customizer` which
 * is invoked to produce the cloned value. If `customizer` returns `undefined`,
 * cloning is handled by the method instead. The `customizer` is invoked with
 * one argument (value).
 *
 * @category Lang
 * @param {*} value The value to clone.
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {*} Returns the cloned value.
 * @see cloneDeepWith
 * @example
 *
 * export function customizer(value) {
 *   if (isElement(value)) {
 *     return value.cloneNode(false)
 *   }
 * }
 *
 * const el = cloneWith(document.body, customizer)
 *
 * console.log(el === document.body)
 * // => false
 * console.log(el.nodeName)
 * // => 'BODY'
 * console.log(el.childNodes.length)
 * // => 0
 */
export function cloneWith(value, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined;
  return _baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
}

