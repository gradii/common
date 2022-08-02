/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseValues } from '../_internal/base-values';
import { keys } from './keys';

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @see keys, valuesIn
 * @example
 *
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * values(new Foo)
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * values('hi')
 * // => ['h', 'i']
 */
export function values(object: any) {
  return object == null ? [] : _baseValues(object, keys(object));
}


