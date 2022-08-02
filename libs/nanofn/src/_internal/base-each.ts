/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseForOwn } from './base-for-own';
import { isArrayLike } from '../is-array-like';

/**
 * The base implementation of `forEach`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
export function _baseEach(collection, iteratee) {
  if (collection == null) {
    return collection;
  }
  if (!isArrayLike(collection)) {
    return _baseForOwn(collection, iteratee);
  }
  const length = collection.length;
  const iterable = Object(collection);
  let index = -1;

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
}


