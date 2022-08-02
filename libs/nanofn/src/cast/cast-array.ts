/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */


/**
 * Casts `value` as an array if it's not one.
 *
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * castArray(1)
 * // => [1]
 *
 * castArray({ 'a': 1 })
 * // => [{ 'a': 1 }]
 *
 * castArray('abc')
 * // => ['abc']
 *
 * castArray(null)
 * // => [null]
 *
 * castArray(undefined)
 * // => [undefined]
 *
 * castArray()
 * // => []
 *
 * const array = [1, 2, 3]
 * console.log(castArray(array) === array)
 * // => true
 */
export function castArray(...args: any[]): any[] {
  if (!args.length) {
    return [];
  }
  const value = args[0];
  return Array.isArray(value) ? value : [value];
}


