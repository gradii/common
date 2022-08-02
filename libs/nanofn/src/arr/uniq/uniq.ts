/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseUniq } from '../../_internal/base-uniq';

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @see uniqBy, uniqWith
 * @example
 *
 * uniq([2, 1, 2])
 * // => [2, 1]
 */
export function uniq(array) {
  return (array != null && array.length)
    ? _baseUniq(array)
    : [];
}


