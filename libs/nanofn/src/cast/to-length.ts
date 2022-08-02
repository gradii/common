/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { toInteger } from './to-integer';

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295;

/**
 * Converts `value` to an integer suitable for use as the length of an
 * array-like object.
 *
 * **Note:** This method is based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * toLength(3.2)
 * // => 3
 *
 * toLength(Number.MIN_VALUE)
 * // => 0
 *
 * toLength(Infinity)
 * // => 4294967295
 *
 * toLength('3.2')
 * // => 3
 */
export function toLength(value: any): number {
  if (!value) {
    return 0;
  }
  value = toInteger(value);
  if (value < 0) {
    return 0;
  }
  if (value > MAX_ARRAY_LENGTH) {
    return MAX_ARRAY_LENGTH;
  }
  return value;
}


