/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { words } from './words';


/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @category String
 * @param {string} [str=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @see camelCase, kebabCase, lowerCase, snakeCase, startCase, upperFirst
 * @example
 *
 * upperCase('--foo-bar')
 * // => 'FOO BAR'
 *
 * upperCase('fooBar')
 * // => 'FOO BAR'
 *
 * upperCase('__foo_bar__')
 * // => 'FOO BAR'
 */
export function upperCase(str: string) {
  return words(str).reduce((result, word, index) => (
    result + (index ? ' ' : '') + word.toUpperCase()
  ), '');
}
