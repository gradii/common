/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseIsEqual } from './base-is-equal';
import { get } from '../get';
import { hasIn } from '../has-in';
import { _isKey } from './is-key';
import { _isStrictComparable } from './is-strict-comparable';
import { _matchesStrictComparable } from './matches-strict-comparable';
import { _toKey } from './to-key';

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1;
const COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
export function _baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return (object) => {
    const objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}


