/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _createMathOperation } from '../_internal/create-math-operation';

/**
 * Subtract two numbers.
 *
 * @category Math
 * @param {number} minuend The first number in a subtraction.
 * @param {number} subtrahend The second number in a subtraction.
 * @returns {number} Returns the difference.
 * @example
 *
 * subtract(6, 4)
 * // => 2
 */
export const subtract = _createMathOperation((minuend, subtrahend) => minuend - subtrahend, 0);
