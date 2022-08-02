/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _createRound } from '../_internal/create-round';

/**
 * Computes `number` rounded to `precision`.
 *
 * @category Math
 * @param {number} number The number to round.
 * @param {number} [precision=0] The precision to round to.
 * @returns {number} Returns the rounded number.
 * @example
 *
 * round(4.006)
 * // => 4
 *
 * round(4.006, 2)
 * // => 4.01
 *
 * round(4060, -2)
 * // => 4100
 */
const round = _createRound('round');

export default round;
