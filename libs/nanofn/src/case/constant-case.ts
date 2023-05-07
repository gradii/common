
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { words } from './words';


/**
 * Converts `string` to
 * [constant case](https://en.wikipedia.org/wiki/constant_case).
 *
 * @category String
 * @param {string} [str=''] The string to convert.
 * @returns {string} Returns the snake cased string.
 * @see camelCase, lowerCase, kebabCase, startCase, upperCase, upperFirst, snakeCase
 * @example
 *
 * constantCase('Foo Bar')
 * // => 'FOO_BAR'
 *
 * constantCase('fooBar')
 * // => 'FOO_BAR'
 *
 * constantCase('--FOO-BAR--')
 * // => 'FOO_BAR'
 *
 * constantCase('foo2bar')
 * // => 'FOO_2_BAR'
 */
export function constantCase(str: string): string {
  return words(str)
    .reduce((result, word, index) => (
      result + (index ? '_' : '') + word.toUpperCase()
    ), '');
}
