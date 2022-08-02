/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseFlatten } from '../../_internal/base-flatten';
import { map } from '../map';

/**
 * This method is like `flatMap` except that it recursively flattens the
 * mapped results up to `depth` times.
 *
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {number} [depth=1] The maximum recursion depth.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatten, flattenDeep, flattenDepth, map, mapKeys, mapValues
 * @example
 *
 * function duplicate(n) {
 *   return [[[n, n]]]
 * }
 *
 * flatMapDepth([1, 2], duplicate, 2)
 * // => [[1, 1], [2, 2]]
 */
export function flatMapDepth(collection, iteratee, depth) {
  depth = depth === undefined ? 1 : +depth;
  return _baseFlatten(map(collection, iteratee), depth);
}


