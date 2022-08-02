/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @category Number
 * @param {number} num The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * clamp(-10, -5, 5)
 * // => -5
 *
 * clamp(10, -5, 5)
 * // => 5
 */
export function clamp(num: number, lower: number, upper: number): number {
  num   = +num;
  lower = +lower;
  upper = +upper;
  lower = lower === lower ? lower : 0;
  upper = upper === upper ? upper : 0;
  if (num === num) {
    num = num <= upper ? num : upper;
    num = num >= lower ? num : lower;
  }
  return num;
}


