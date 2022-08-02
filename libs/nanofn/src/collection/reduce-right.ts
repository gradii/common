/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _arrayReduceRight } from '../_internal/array-reduce-right';
import { _baseEachRight } from '../_internal/base-each-right';
import { _baseReduce } from '../_internal/base-reduce';

/**
 * This method is like `reduce` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see reduce
 * @example
 *
 * const array = [[0, 1], [2, 3], [4, 5]]
 *
 * reduceRight(array, (flattened, other) => flattened.concat(other), [])
 * // => [4, 5, 2, 3, 0, 1]
 */
export function reduceRight(collection, iteratee, accumulator) {
  const func = Array.isArray(collection) ? _arrayReduceRight : _baseReduce;
  const initAccum = arguments.length < 3;
  return func(collection, iteratee, accumulator, initAccum, _baseEachRight);
}


