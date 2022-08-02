/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isObject } from '../is-object';

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
export function _isStrictComparable(value) {
  return value === value && !isObject(value);
}


