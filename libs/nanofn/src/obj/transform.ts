/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _arrayEach } from '../_internal/array-each';
import { _baseForOwn } from '../_internal/base-for-own';
import { isBuffer } from '../is/is-buffer';
import { isObject } from '../is/is-object';
import { isTypedArray } from '../is/is-typed-array';

/**
 * An alternative to `reduce` this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @see reduce, reduceRight
 * @example
 *
 * transform([2, 3, 4], (result, n) => {
 *   result.push(n *= n)
 *   return n % 2 == 0
 * }, [])
 * // => [4, 9]
 *
 * transform({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
 *   (result[value] || (result[value] = [])).push(key)
 * }, {})
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */
export function transform(object, iteratee, accumulator) {
  const isArr     = Array.isArray(object);
  const isArrLike = isArr || isBuffer(object) || isTypedArray(object);

  if (accumulator == null) {
    const Ctor = object && object.constructor;
    if (isArrLike) {
      accumulator = isArr ? new Ctor : [];
    } else if (isObject(object)) {
      accumulator = typeof Ctor === 'function'
        ? Object.create(Object.getPrototypeOf(object))
        : {};
    } else {
      accumulator = {};
    }
  }
  (isArrLike ? _arrayEach : _baseForOwn)(object, (value, index, object) =>
    iteratee(accumulator, value, index, object));
  return accumulator;
}


