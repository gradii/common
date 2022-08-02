/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseIsMatch } from '../_internal/base-is-match';
import { _getMatchData } from '../_internal/get-match-data';

/**
 * This method is like `isMatch` except that it accepts `customizer` which
 * is invoked to compare values. If `customizer` returns `undefined`, comparisons
 * are handled by the method instead. The `customizer` is invoked with five
 * arguments: (objValue, srcValue, index|key, object, source).
 *
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 * @example
 *
 * export function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value)
 * }
 *
 * function customizer(objValue, srcValue) {
 *   if (isGreeting(objValue) && isGreeting(srcValue)) {
 *     return true
 *   }
 * }
 *
 * const object = { 'greeting': 'hello' }
 * const source = { 'greeting': 'hi' }
 *
 * isMatchWith(object, source, customizer)
 * // => true
 */
function isMatchWith(object, source, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined;
  return _baseIsMatch(object, source, _getMatchData(source), customizer);
}

MatchWith;
