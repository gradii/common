/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { castSlice } from './_internal/cast-slice';
import { charsEndIndex } from './_internal/chars-end-index';
import { stringToArray } from './_internal/string-to-array';

const methodName = ''.trimRight ? 'trimRight' : 'trimEnd';

/**
 * Removes trailing whitespace or specified characters from `string`.
 *
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trim, trimStart
 * @example
 *
 * trimEnd('  abc  ')
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-')
 * // => '-_-abc'
 */
export function trimEnd(string, chars) {
  if (string && chars === undefined) {
    return string[methodName]();
  }
  if (!string || !chars) {
    return (string || '');
  }
  const strSymbols = stringToArray(string);
  const end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
  return castSlice(strSymbols, 0, end).join('');
}


