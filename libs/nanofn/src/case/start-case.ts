/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { upperFirst } from './upper-first';
import { words } from './words';


/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @category String
 * @param {string} [str=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @see camelCase, lowerCase, kebabCase, snakeCase, upperCase, upperFirst
 * @example
 *
 * startCase('--foo-bar--')
 * // => 'Foo Bar'
 *
 * startCase('fooBar')
 * // => 'Foo Bar'
 *
 * startCase('__FOO_BAR__')
 * // => 'FOO BAR'
 */
export function startCase(str: string): string {
  return words(str)
    .reduce((result, word, index) => (
      result + (index ? ' ' : '') + upperFirst(word)
    ), '');
}

