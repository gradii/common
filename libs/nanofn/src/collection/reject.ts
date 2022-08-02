/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { filter } from '../arr/filter';
import { negate } from '../fun/negate';
import { filterObject } from '../obj/filter-object';

/**
 * The opposite of `filter` this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, filter
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ]
 *
 * reject(users, ({ active }) => active)
 * // => objects for ['fred']
 */
export function reject(collection, predicate) {
  const func = Array.isArray(collection) ? filter : filterObject;
  return func(collection, negate(predicate));
}


