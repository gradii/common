/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _unicodeWords } from '../_internal/unicode-words';

const hasUnicodeWord = RegExp.prototype.test.bind(
  /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
);

/** Used to match words composed of alphanumeric characters. */
// eslint-disable-next-line no-control-regex
const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

function asciiWords(string: string) {
  return string.match(reAsciiWord);
}

/**
 * Splits `string` into an array of its words.
 *
 * @category String
 * @param {string} [str=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * words('fred, barney, & pebbles')
 * // => ['fred', 'barney', 'pebbles']
 *
 * words('fred, barney, & pebbles', /[^, ]+/g)
 * // => ['fred', 'barney', '&', 'pebbles']
 */
export function words(str: string, pattern?: RegExp | string): string[] {
  if (pattern === undefined) {
    const result = hasUnicodeWord(str) ? _unicodeWords(str) : asciiWords(str);
    return result || [];
  }
  return str.match(pattern) || [];
}


