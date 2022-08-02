/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { castSlice } from './_internal/cast-slice';
import { charsEndIndex } from './_internal/chars-end-index';
import { charsStartIndex } from './_internal/chars-start-index';
import { stringToArray } from './_internal/string-to-array';

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trimEnd, trimStart
 * @example
 *
 * trim('  abc  ')
 * // => 'abc'
 *
 * trim('-_-abc-_-', '_-')
 * // => 'abc'
 */
export function trim(string, chars) {
  if (string && chars === undefined) {
    return string.trim();
  }
  if (!string || !chars) {
    return (string || '');
  }
  const strSymbols = stringToArray(string);
  const chrSymbols = stringToArray(chars);
  const start = charsStartIndex(strSymbols, chrSymbols);
  const end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}


