/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Checks if `string` ends with the given target string.
 *
 * @category String
 * @param {string} [str=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @see includes, startsWith
 * @example
 *
 * endsWith('abc', 'c')
 * // => true
 *
 * endsWith('abc', 'b')
 * // => false
 *
 * endsWith('abc', 'b', 2)
 * // => true
 */
export function endsWith(str: string, target, position) {
  const {length} = str;
  position       = position === undefined ? length : +position;
  if (position < 0 || position != position) {
    position = 0;
  } else if (position > length) {
    position = length;
  }
  const end = position;
  position -= target.length;
  return position >= 0 && str.slice(position, end) == target;
}


