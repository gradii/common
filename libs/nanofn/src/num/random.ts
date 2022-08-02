/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { toFinite } from '../cast/to-finite';

/** Built-in method references without a dependency on `root`. */
const freeParseFloat = parseFloat;

/**
 * Produces a random number between the inclusive `lower` and `upper` bounds.
 * If only one argument is provided a number between `0` and the given number
 * is returned. If `floating` is `true`, or either `lower` or `upper` are
 * floats, a floating-point number is returned instead of an integer.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @category Number
 * @param {number} [lower=0] The lower bound.
 * @param {number} [upper=1] The upper bound.
 * @param {boolean} [floating] Specify returning a floating-point number.
 * @returns {number} Returns the random number.
 * @see uniqueId
 * @example
 *
 * random(0, 5)
 * // => an integer between 0 and 5
 *
 * random(5)
 * // => also an integer between 0 and 5
 *
 * random(5, true)
 * // => a floating-point number between 0 and 5
 *
 * random(1.2, 5.2)
 * // => a floating-point number between 1.2 and 5.2
 */
export function random(floating: boolean): number;
export function random(lower: number, floating?: boolean): number;
export function random(lower?: number | boolean, upper?: number | boolean,
                       floating?: boolean): number {
  if (floating === undefined) {
    if (typeof upper === 'boolean') {
      floating = upper;
      upper    = undefined;
    } else if (typeof lower === 'boolean') {
      floating = lower;
      lower    = undefined;
    }
  }
  if (lower === undefined && upper === undefined) {
    lower = 0;
    upper = 1;
  } else {
    lower = toFinite(lower);
    if (upper === undefined) {
      upper = lower;
      lower = 0;
    } else {
      upper = toFinite(upper);
    }
  }
  if (lower > upper) {
    const temp = lower;
    lower      = upper;
    upper      = temp;
  }
  if (floating || (lower as number) % 1 || (upper as number) % 1) {
    const rand       = Math.random();
    const randLength = `${rand}`.length - 1;
    return Math.min(
      (lower as number) + (rand * ((upper as number) - (lower as number) +
        freeParseFloat(`1e-${randLength}`))), (upper as number)
    );
  }
  return (lower as number) + Math.floor(
    Math.random() * ((upper as number) - (lower as number) + 1));
}


