/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _createMathOperation } from '../_internal/create-math-operation';

/**
 * Adds two numbers.
 *
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * add(6, 4)
 * // => 10
 */
export type add = (augend: number, addend: number) => number;
export const add = _createMathOperation((augend: number, addend: number) => augend + addend, 0);
