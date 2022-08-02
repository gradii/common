/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _createRound } from '../_internal/create-round';

/**
 * Computes `number` rounded down to `precision`.
 *
 * @category Math
 * @param {number} number The number to round down.
 * @param {number} [precision=0] The precision to round down to.
 * @returns {number} Returns the rounded down number.
 * @example
 *
 * floor(4.006)
 * // => 4
 *
 * floor(0.046, 2)
 * // => 0.04
 *
 * floor(4060, -2)
 * // => 4000
 */
export type floor = (num: number, precision?: number) => number;
export const floor = _createRound('floor');
