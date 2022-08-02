/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { castSlice } from './_internal/cast-slice';
import { charsStartIndex } from './_internal/chars-start-index';
import { stringToArray } from './_internal/string-to-array';

const methodName =  ''.trimLeft ? 'trimLeft' : 'trimStart';

/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trim, trimEnd
 * @example
 *
 * trimStart('  abc  ')
 * // => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-')
 * // => 'abc-_-'
 */
export function trimStart(string, chars) {
  if (string && chars === undefined) {
    return string[methodName]();
  }
  if (!string || !chars) {
    return (string || '');
  }
  const strSymbols = stringToArray(string);
  const start = charsStartIndex(strSymbols, stringToArray(chars));
  return castSlice(strSymbols, start).join('');
}


