/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _castPath } from '../_internal/cast-path';
import { isArguments } from '../is/is-arguments';
import { _isIndex } from '../_internal/is-index';
import { isLength } from '../is/is-length';
import { _toKey } from '../_internal/to-key';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @see has, hasIn, hasPathIn
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * hasPath(object, 'a.b')
 * // => true
 *
 * hasPath(object, ['a', 'b'])
 * // => true
 */
export function hasPath(object: any, path: string): boolean {
  path = _castPath(path, object);

  let index    = -1;
  let {length} = path;
  let result   = false;
  let key;

  while (++index < length) {
    key = _toKey(path[index]);
    if (!(result = object != null && hasOwnProperty.call(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && _isIndex(key, length) &&
    (Array.isArray(object) || isArguments(object));
}


