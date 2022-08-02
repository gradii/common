/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseIsEqualDeep } from './base-is-equal-deep';
import { isObjectLike } from '../is-object-like';

/**
 * The base implementation of `isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
export function _baseIsEqual(value: any, other: any, bitmask?: boolean, customizer?: Function,
                            stack?: any): boolean {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, _baseIsEqual, stack);
}


