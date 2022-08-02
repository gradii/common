/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseIsEqual } from '../_internal/base-is-equal';

/**
 * This method is like `isEqual` except that it accepts `customizer` which
 * is invoked to compare values. If `customizer` returns `undefined`, comparisons
 * are handled by the method instead. The `customizer` is invoked with up to
 * six arguments: (objValue, othValue [, index|key, object, other, stack]).
 *
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * export function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value)
 * }
 *
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true
 *   }
 * }
 *
 * const array = ['hello', 'goodbye']
 * const other = ['hi', 'goodbye']
 *
 * isEqualWith(array, other, customizer)
 * // => true
 */
export function isEqualWith(value: any, other: any,
                            customizer?: (value: any, other: any) => boolean | void): boolean {
  customizer   = typeof customizer === 'function' ? customizer : undefined;
  const result = customizer ? customizer(value, other) : undefined;
  return result === undefined ? _baseIsEqual(value, other, undefined, customizer) : !!result;
}
