/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _createMathOperation } from '../_internal/create-math-operation';

/**
 * Multiply two numbers.
 *
 * @category Math
 * @param {number} multiplier The first number in a multiplication.
 * @param {number} multiplicand The second number in a multiplication.
 * @returns {number} Returns the product.
 * @example
 *
 * multiply(6, 4)
 * // => 24
 */
const multiply = _createMathOperation((multiplier, multiplicand) => multiplier * multiplicand, 1);

export default multiply;
