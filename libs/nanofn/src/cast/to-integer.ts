/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @see isInteger, isNumber, toNumber
 * @example
 *
 * toInteger(3.2)
 * // => 3
 *
 * toInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toInteger(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toInteger('3.2')
 * // => 3
 */
export function toInteger(value: any): number {
  if(isNaN(value)) {
    return 0;
  }
  const remainder = value % 1;

  return remainder ? value - remainder : value;
}


