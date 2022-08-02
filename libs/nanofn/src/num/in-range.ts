/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseInRange } from '../_internal/base-in-range';

/**
 * Checks if `number` is between `start` and up to, but not including, `end`. If
 * `end` is not specified, it's set to `start` with `start` then set to `0`.
 * If `start` is greater than `end` the params are swapped to support
 * negative ranges.
 *
 * @category Number
 * @param {number} number The number to check.
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 * @see range, rangeRight
 * @example
 *
 * inRange(3, 2, 4)
 * // => true
 *
 * inRange(4, 8)
 * // => true
 *
 * inRange(4, 2)
 * // => false
 *
 * inRange(2, 2)
 * // => false
 *
 * inRange(1.2, 2)
 * // => true
 *
 * inRange(5.2, 4)
 * // => false
 *
 * inRange(-3, -2, -6)
 * // => true
 */
export function inRange(num: number, end: number): boolean;
export function inRange(num: number, start: number, end?: number): boolean {
  if (end === undefined) {
    end   = start;
    start = 0;
  }
  return _baseInRange(+num, +start, +end);
}


