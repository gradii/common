/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Creates an array of values by running each property of `object` thru
 * `iteratee`. The iteratee is invoked with three arguments: (value, key, object).
 *
 * @category Object
 * @param {Object} obj The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * map({ 'a': 4, 'b': 8 }, square)
 * // => [16, 64] (iteration order is not guaranteed)
 */
export function mapObject(
  obj: any,
  iteratee: (value: any, key: string, object: any) => any
): any {
  const props  = Object.keys(obj);
  const result = new Array(props.length);

  props.forEach((key, index) => {
    result[index] = iteratee(obj[key], key, obj);
  });
  return result;
}


