/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _isPrototype } from './is-prototype';

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
export function _initCloneObject(object) {
  return (typeof object.constructor === 'function' && !_isPrototype(object))
    ? Object.create(Object.getPrototypeOf(object))
    : {};
}


