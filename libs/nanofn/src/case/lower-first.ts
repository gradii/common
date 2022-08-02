/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Converts the first character of `string` to lower case.
 *
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * lowerFirst('Fred')
 * // => 'fred'
 *
 * lowerFirst('FRED')
 * // => 'fRED'
 */

export function lowerFirst(str: string) {
  if (str.length > 1) {
    return str[0].toLowerCase() + str.slice(1);
  } else {
    return str.toLowerCase();
  }
}
