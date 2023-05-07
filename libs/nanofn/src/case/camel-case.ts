/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { upperFirst } from './upper-first';
import { words } from './words';

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @category String
 * @param {string} [str=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 */
export function camelCase(str: string) {
  return words(str)
    .reduce((result, word, index) => {
      word = word.toLowerCase();
      return result + (index ? upperFirst(word) : word);
    }, '');
}
