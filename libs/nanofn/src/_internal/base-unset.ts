/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _castPath } from './cast-path';
import { last } from '../last';
import { _parent } from './parent';
import { _toKey } from './to-key';

/**
 * The base implementation of `unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
export function _baseUnset(object, path) {
  path = _castPath(path, object);
  object = _parent(object, path);
  return object == null || delete object[_toKey(last(path))];
}


