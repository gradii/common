/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isSymbol } from '../is/is-symbol';

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
export function _toKey(value: any): string | symbol {
  if (typeof value === 'string' || isSymbol(value)) {
    return value;
  }
  const result = `${value}`;
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}


