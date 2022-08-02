/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseForRight } from './base-for-right';
import { keys } from '../keys';

/**
 * The base implementation of `forOwnRight`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
export function _baseForOwnRight(object, iteratee) {
  return object && _baseForRight(object, iteratee, keys);
}


