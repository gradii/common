/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { toString } from '../cast/to-string';
import { words } from './words';

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @category String
 * @param {string} [str=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @see camelCase, lowerCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * kebabCase('Foo Bar')
 * // => 'foo-bar'
 *
 * kebabCase('fooBar')
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__')
 * // => 'foo-bar'
 */
export function kebabCase(str: string) {
  return words(toString(str).replace(/['\u2019]/g, ''))
    .reduce((result, word, index) => (
      result + (index ? '-' : '') + word.toLowerCase()
    ), '');
}

export function slugCase(str: string) {
  return kebabCase(str);
}