/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { map } from '../arr/map';
import { _copyArray } from '../_internal/copy-array';
import { isSymbol } from '../is/is-symbol';
import { stringToPath } from '../_internal/string-to-path';
import { _toKey } from '../_internal/to-key';

/**
 * Converts `value` to a property path array.
 *
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * toPath('a.b.c')
 * // => ['a', 'b', 'c']
 *
 * toPath('a[0].b.c')
 * // => ['a', '0', 'b', 'c']
 */
export function toPath(value: any): string[] {
  if (Array.isArray(value)) {
    return map(value, _toKey);
  }
  return isSymbol(value) ? [value] : _copyArray(stringToPath(value));
}


