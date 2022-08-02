/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseGet } from '../_internal/base-get';

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @see has, hasIn, set, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
export function getter(object: Record<string, any>, path: string, defaultValue?: any): any {
  const result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}


