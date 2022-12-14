/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseGet } from './base-get';
import { slice } from '../arr/slice';

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
export function _parent(object, path) {
  return path.length < 2 ? object : _baseGet(object, slice(path, 0, -1));
}


