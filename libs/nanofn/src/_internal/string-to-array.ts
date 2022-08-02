/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _asciiToArray } from './ascii-to-array';
import { _hasUnicode } from './has-unicode';
import { _unicodeToArray } from './unicode-to-array';

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} str The string to convert.
 * @returns {Array} Returns the converted array.
 */
export function _stringToArray(str: string): number[] {
  return _hasUnicode(str)
    ? _unicodeToArray(str)
    : _asciiToArray(str);
}


