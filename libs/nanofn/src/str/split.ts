/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _castSlice } from '../_internal/cast-slice';
import { _hasUnicode } from '../_internal/has-unicode';
import { isRegExp } from '../is/is-reg-exp';
import { _stringToArray } from '../_internal/string-to-array';

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;

/**
 * Splits `string` by `separator`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @category String
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the string segments.
 * @example
 *
 * split('a-b-c', '-', 2)
 * // => ['a', 'b']
 */
export function split(string, separator, limit) {
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
  if (!limit) {
    return [];
  }
  if (string && (
    typeof separator === 'string' ||
    (separator != null && !isRegExp(separator))
  )) {
    if (!separator && _hasUnicode(string)) {
      return _castSlice(_stringToArray(string), 0, limit);
    }
  }
  return string.split(separator, limit);
}


