/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _castPath } from '../_internal/cast-path';
import { _parent } from '../_internal/parent';
import { _toKey } from '../_internal/to-key';
import { last } from '../arr/last';

/**
 * Invokes the method at `path` of `object`.
 *
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} [args] The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] }
 *
 * invoke(object, 'a[0].b.c.slice', [1, 3])
 * // => [2, 3]
 */
export function invoke(object, path, args) {
  path = _castPath(path, object);
  object = _parent(object, path);
  const func = object == null ? object : object[_toKey(last(path))];
  return func == null ? undefined : func.apply(object, args);
}


