/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseGet } from './base-get';
import { _baseSet } from './base-set';
import { _castPath } from './cast-path';

/**
 * The base implementation of `pickBy`.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
export function _basePickBy(object, paths, predicate) {
  let index = -1;
  const length = paths.length;
  const result = {};

  while (++index < length) {
    const path = paths[index];
    const value = _baseGet(object, path);
    if (predicate(value, path)) {
      _baseSet(result, _castPath(path, object), value);
    }
  }
  return result;
}


