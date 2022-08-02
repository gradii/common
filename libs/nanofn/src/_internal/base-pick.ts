/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _basePickBy } from './base-pick-by';
import { hasIn } from '../has-in';

/**
 * The base implementation of `pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
export function _basePick(object, paths) {
  return _basePickBy(object, paths, (value, path) => hasIn(object, path));
}


