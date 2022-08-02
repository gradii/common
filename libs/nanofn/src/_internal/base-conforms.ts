/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseConformsTo } from './base-conforms-to';
import { keys } from '../keys';

/**
 * The base implementation of `conforms` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 */
export function _baseConforms(source) {
  const props = keys(source);
  return (object) => _baseConformsTo(object, source, props);
}


