/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
export function keysIn(object) {
  const result = [];
  for (const key in object) {
    result.push(key);
  }
  return result;
}



