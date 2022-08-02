/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isSymbol } from '../is/is-symbol';

/** Used as references for various `Number` constants. */
const NAN = 0 / 0;

/**
 * The base implementation of `toNumber` which doesn't ensure correct
 * conversions of binary, hexadecimal, or octal string values.
 *
 * @private
 * @param {*} val The value to process.
 * @returns {number} Returns the number.
 */
export function _baseToNumber(val: any): number {
  if (typeof val === 'number') {
    return val;
  }
  if (isSymbol(val)) {
    return NAN;
  }
  return +val;
}


