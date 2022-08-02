/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Checks if `predicate` returns truthy for **any** element of `object`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, key, object).
 *
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * someValues({ 'a': 0, 'b': 'yes', 'c': false }, Boolean)
 * // => true
 */
export function someValues(object, predicate) {
  object = Object(object);
  const props = Object.keys(object);

  for (const key of props) {
    if (predicate(object[key], key, object)) {
      return true;
    }
  }
  return false;
}


