/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseWhile } from '../_internal/base-while';
import { toInteger } from '../cast/to-integer';
import { slice } from './slice';

/**
 * Creates a slice of `array` with `n` elements dropped from the beginning.
 *
 * @category Array
 * @param {Array} arr The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * drop([1, 2, 3])
 * // => [2, 3]
 *
 * drop([1, 2, 3], 2)
 * // => [3]
 *
 * drop([1, 2, 3], 5)
 * // => []
 *
 * drop([1, 2, 3], 0)
 * // => [1, 2, 3]
 */
export function drop(arr: any[], n = 1): any[] {
  const length = arr == null ? 0 : arr.length;
  return length
    ? slice(arr, n < 0 ? 0 : toInteger(n), length)
    : [];
}


/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @category Array
 * @param {Array} arr The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * dropRight([1, 2, 3])
 * // => [1, 2]
 *
 * dropRight([1, 2, 3], 2)
 * // => [1]
 *
 * dropRight([1, 2, 3], 5)
 * // => []
 *
 * dropRight([1, 2, 3], 0)
 * // => [1, 2, 3]
 */
export function dropRight(arr: any[], n = 1): any[] {
  const length = arr == null ? 0 : arr.length;
  n            = length - toInteger(n);
  return length ? slice(arr, 0, n < 0 ? 0 : n) : [];
}


/**
 * Creates a slice of `array` excluding elements dropped from the end.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': true }
 * ]
 *
 * dropRightWhile(users, ({ active }) => active)
 * // => objects for ['barney']
 */
export function dropRightWhile(array, predicate) {
  return (array != null && array.length)
    ? _baseWhile(array, predicate, true, true)
    : [];
}


/**
 * Creates a slice of `array` excluding elements dropped from the beginning.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': false }
 * ]
 *
 * dropWhile(users, ({ active }) => active)
 * // => objects for ['pebbles']
 */
export function dropWhile(array, predicate) {
  return (array != null && array.length)
    ? _baseWhile(array, predicate, true)
    : [];
}

