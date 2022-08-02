/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { repeat } from '../repeat';
import { _baseToString } from './base-to-string';
import { _castSlice } from './cast-slice';
import { _hasUnicode } from './has-unicode';
import { _stringSize } from './string-size';
import { _stringToArray } from './string-to-array';

/**
 * Creates the padding for `string` based on `length`. The `chars` string
 * is truncated if the number of characters exceeds `length`.
 *
 * @private
 * @param {number} length The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padding for `string`.
 */
export function _createPadding(length, chars) {
  chars = chars === undefined ? ' ' : _baseToString(chars);

  const charsLength = chars.length;
  if (charsLength < 2) {
    return charsLength ? repeat(chars, length) : chars;
  }
  const result = repeat(chars, Math.ceil(length / _stringSize(chars)));
  return _hasUnicode(chars)
    ? _castSlice(_stringToArray(result), 0, length).join('')
    : result.slice(0, length);
}


