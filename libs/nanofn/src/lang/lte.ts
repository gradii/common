/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than or equal to
 *  `other`, else `false`.
 * @see gt, gte, lt
 * @example
 *
 * lte(1, 3)
 * // => true
 *
 * lte(3, 3)
 * // => true
 *
 * lte(3, 1)
 * // => false
 */
export function lte(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value;
    other = +other;
  }
  return value <= other;
}


