/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { words } from './words';


/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @category String
 * @param {string} [str=''] The string to convert.
 * @returns {string} Returns the snake cased string.
 * @see camelCase, lowerCase, kebabCase, startCase, upperCase, upperFirst
 * @example
 *
 * snakeCase('Foo Bar')
 * // => 'foo_bar'
 *
 * snakeCase('fooBar')
 * // => 'foo_bar'
 *
 * snakeCase('--FOO-BAR--')
 * // => 'foo_bar'
 *
 * snakeCase('foo2bar')
 * // => 'foo_2_bar'
 */
export function snakeCase(str: string): string {
  return words(str)
    .reduce((result, word, index) => (
      result + (index ? '_' : '') + word.toLowerCase()
    ), '');
}
