/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Checks if `value` is greater than or equal to `other`.
 *
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than or equal to
 *  `other`, else `false`.
 * @see gt, lt, lte
 * @example
 *
 * gte(3, 1)
 * // => true
 *
 * gte(3, 3)
 * // => true
 *
 * gte(1, 3)
 * // => false
 */
export function gte(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value;
    other = +other;
  }
  return value >= other;
}


