/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _asciiSize } from './ascii-size';
import { _hasUnicode } from './has-unicode';
import { _unicodeSize } from './unicode-size';

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} str The string to inspect.
 * @returns {number} Returns the string size.
 */
export function _stringSize(str: string): number {
  return _hasUnicode(str) ? _unicodeSize(str) : _asciiSize(str);
}


