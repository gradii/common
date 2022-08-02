/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { arrayEachRight } from './_internal/array-each-right';
import { baseEachRight } from './_internal/base-each-right';

/**
 * This method is like `forEach` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @alias eachRight
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see forEach, forIn, forInRight, forOwn, forOwnRight
 * @example
 *
 * forEachRight([1, 2], value => console.log(value))
 * // => Logs `2` then `1`.
 */
export function forEachRight(collection, iteratee) {
  const func = Array.isArray(collection) ? arrayEachRight : baseEachRight;
  return func(collection, iteratee);
}


