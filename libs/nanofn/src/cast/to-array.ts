/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */


/**
 * Casts `value` as an array if it's not one.
 *
 * @category Lang
 * @param value The value to inspect.
 * @returns Returns the cast array.
 * @example
 *
 * toArray(1)
 * // => [1]
 *
 * toArray({ 'a': 1 })
 * // => [{ 'a': 1 }]
 *
 * toArray('abc')
 * // => ['abc']
 *
 * toArray(null)
 * // => []
 *
 * toArray(undefined)
 * // => []
 *
 * toArray()
 * // => []
 *
 * const array = [1, 2, 3]
 * console.log(toArray(array) === array)
 * // => true
 */
export function toArray(...args: any[]): any[] {
  if (!args.length) {
    return [];
  }
  if (args[0] == null) {
    return [];
  }
  const value = args[0];
  return Array.isArray(value) ? value : [value];
}


