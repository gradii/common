/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _arrayLikeKeys } from '../_internal/array-like-keys';
import { isArrayLike } from '../is/is-array-like';

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @category Object
 * @param {Object} obj The object to query.
 * @returns {Array} Returns the array of property names.
 * @see values, valuesIn
 * @example
 *
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * keys(new Foo)
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * keys('hi')
 * // => ['0', '1']
 */
export function keys(obj: any): string[] {
  return isArrayLike(obj)
    ? _arrayLikeKeys(obj)
    : Object.keys(Object(obj));
}


