/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseEach } from './base-each';
import { _baseSortBy } from './base-sort-by';
import { _baseGet } from './base-get';
import { _compareMultiple } from './compare-multiple';
import { isArrayLike } from '../is-array-like';

const identity = (value) => value;

/**
 * The base implementation of `orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
export function _baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = iteratees.map((iteratee) => {
      if (Array.isArray(iteratee)) {
        return (value) => _baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
      }

      return iteratee;
    });
  } else {
    iteratees = [identity];
  }

  let criteriaIndex = -1;
  let eachIndex = -1;

  const result = isArrayLike(collection) ? new Array(collection.length) : [];

  _baseEach(collection, (value) => {
    const criteria = iteratees.map((iteratee) => iteratee(value));

    result[++eachIndex] = {
      criteria,
      index: ++criteriaIndex,
      value
    };
  });

  return _baseSortBy(result, (object, other) => _compareMultiple(object, other, orders));
}


