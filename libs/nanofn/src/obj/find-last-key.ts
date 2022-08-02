/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseFindKey } from '../_internal/base-find-key';
import { _baseForOwnRight } from '../_internal/base-for-own-right';

/**
 * This method is like `findKey` except that it iterates over elements of
 * a collection in the opposite order.
 *
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @see find, findIndex, findKey, findLast, findLastIndex
 * @example
 *
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * }
 *
 * findLastKey(users, ({ age }) => age < 40)
 * // => returns 'pebbles' assuming `findKey` returns 'barney'
 */
export function findLastKey(object, predicate) {
  return _baseFindKey(object, predicate, _baseForOwnRight);
}
