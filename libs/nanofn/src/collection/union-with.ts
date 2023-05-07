/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { uniq } from './uniq';
import { uniqBy } from './uniq-by';

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements. If an element exists
 * in both lists, the first element from the first list will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      const l1 = [{a: 1}, {a: 2}];
 *      const l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */
export function unionWith<T, K>(list1: T[], list2: K[],
                                pred?: (arg: T | K) => T | K) {
  const concated = [...list1, ...list2];
  if (pred) {
    return uniqBy(concated, pred);
  } else {
    return uniq(concated);
  }
}