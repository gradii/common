/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _createPadding } from '../_internal/create-padding';
import { _stringSize } from '../_internal/string-size';

/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * pad('abc', 8)
 * // => '  abc   '
 *
 * pad('abc', 8, '_-')
 * // => '_-abc_-_'
 *
 * pad('abc', 2)
 * // => 'abc'
 */
export function pad(string, length, chars) {
  const strLength = length ? _stringSize(string) : 0;
  if (!length || strLength >= length) {
    return (string || '');
  }
  const mid = (length - strLength) / 2;
  return (
    _createPadding(Math.floor(mid), chars) +
    string +
    _createPadding(Math.ceil(mid), chars)
  );
}

/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * padEnd('abc', 6)
 * // => 'abc   '
 *
 * padEnd('abc', 6, '_-')
 * // => 'abc_-_'
 *
 * padEnd('abc', 2)
 * // => 'abc'
 */
export function padEnd(string, length, chars) {
  const strLength = length ? _stringSize(string) : 0;
  return (length && strLength < length)
    ? (string + _createPadding(length - strLength, chars))
    : (string || '');
}


/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * padStart('abc', 6)
 * // => '   abc'
 *
 * padStart('abc', 6, '_-')
 * // => '_-_abc'
 *
 * padStart('abc', 2)
 * // => 'abc'
 */
export function padStart(string, length, chars) {
  const strLength = length ? _stringSize(string) : 0;
  return (length && strLength < length)
    ? (_createPadding(length - strLength, chars) + string)
    : (string || '');
}




