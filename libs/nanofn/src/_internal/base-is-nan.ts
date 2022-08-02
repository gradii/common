/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * The base implementation of `isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
export function _baseIsNaN(value: any) {
  return value !== value;
}


