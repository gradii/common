/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _createMathOperation } from '../_internal/create-math-operation';

/**
 * Divide two numbers.
 *
 * @category Math
 * @param {number} dividend The first number in a division.
 * @param {number} divisor The second number in a division.
 * @returns {number} Returns the quotient.
 * @example
 *
 * divide(6, 4)
 * // => 1.5
 */
export type divide = (num: number, precision?: number) => number;
export const divide = _createMathOperation(
  (dividend: number, divisor: number) => dividend / divisor, 1);
