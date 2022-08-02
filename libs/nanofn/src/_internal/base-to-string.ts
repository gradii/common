/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isSymbol } from '../is/is-symbol';

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
const symbolToString = Symbol.prototype.toString;

/**
 * The base implementation of `toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
export function _baseToString(value: any): string {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map(_baseToString)}`;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  const result = `${value}`;
  return (result === '0' && (1 / value) === -INFINITY) ? '-0' : result;
}


