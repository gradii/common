/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseFlatten } from '../../_internal/base-flatten';
import { map } from '../map';

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/**
 * This method is like `flatMap` except that it recursively flattens the
 * mapped results.
 *
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDepth, flatten, flattenDeep, flattenDepth, map, mapKeys, mapValues
 * @example
 *
 * function duplicate(n) {
 *   return [[[n, n]]]
 * }
 *
 * flatMapDeep([1, 2], duplicate)
 * // => [1, 1, 2, 2]
 */
export function flatMapDeep(collection, iteratee) {
  return _baseFlatten(map(collection, iteratee), INFINITY);
}


