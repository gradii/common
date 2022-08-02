/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseGet } from '../_internal/base-get';

/**
 * The opposite of `property`s method creates a function that returns
 * the value at a given path of `object`.
 *
 * @category Util
 * @param {Object} obj The object to query.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * const array = [0, 1, 2]
 * const object = { 'a': array, 'b': array, 'c': array }
 *
 * map(['a[2]', 'c[0]'], propertyOf(object))
 * // => [2, 0]
 *
 * map([['a', '2'], ['c', '0']], propertyOf(object))
 * // => [2, 0]
 */
export function propertyOf(obj) {
  return (path) => obj == null ? undefined : _baseGet(obj, path);
}


