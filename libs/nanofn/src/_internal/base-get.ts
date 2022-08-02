/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _castPath } from './cast-path';
import { _toKey } from './to-key';

/**
 * The base implementation of `get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
export function _baseGet(object: any, path: string | string[]) {
  path = _castPath(path, object);

  let index    = 0;
  const length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}


