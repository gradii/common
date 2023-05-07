/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { upperFirst } from './upper-first';
import { words } from './words';

export function pascalCase(str: string): string {
  return words(str)
    .reduce((result, word, index) => {
      word = word.toLowerCase();
      return result + upperFirst(word);
    }, '');
}
