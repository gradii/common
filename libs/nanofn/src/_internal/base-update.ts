/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseGet } from './base-get';
import { _baseSet } from './base-set';

/**
 * The base implementation of `update`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to update.
 * @param {Function} updater The function to produce the updated value.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
export function _baseUpdate(object, path, updater, customizer) {
  return _baseSet(object, path, updater(_baseGet(object, path)), customizer);
}


