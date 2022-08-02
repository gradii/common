/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isArrayLike } from '../is-array-like';
import { _isIndex } from './is-index';
import { isObject } from '../is-object';
import { eq } from '../eq';

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */

export function _isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  const type = typeof index;
  if (type === 'number'
    ? (isArrayLike(object) && _isIndex(index, object.length))
    : (type === 'string' && index in object)
  ) {
    return eq(object[index], value);
  }
  return false;
}


