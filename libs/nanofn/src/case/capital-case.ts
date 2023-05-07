/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { upperFirst } from './upper-first';

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @category String
 * @param {string} [str=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * capitalize('FRED')
 * // => 'Fred'
 */
export function capitalCase(str: string) {
  return upperFirst(str.toLowerCase());
}
