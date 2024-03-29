/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { words } from './words';

const reQuotes = /['\u2019]/g;


/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @category String
 * @param {string} [str=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @see camelCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * lowerCase('\0\0Foo\\00Bar\0\0')
 * // => 'foo bar'
 *
 * lowerCase('--Foo-Bar--')
 * // => 'foo bar'
 *
 * lowerCase('fooBar')
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__')
 * // => 'foo bar'
 */
export function lowerCase(str: string): string {
  return words(str.replace(reQuotes, ''))
    .reduce((result, word, index) => (
      result + (index ? ' ' : '') + word.toLowerCase()
    ), '');
}
