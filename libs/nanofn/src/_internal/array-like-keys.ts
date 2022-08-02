/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isArguments } from '../is/is-arguments';
import { isBuffer } from '../is/is-buffer';
import { isTypedArray } from '../is/is-typed-array';
import { _isIndex } from './is-index';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
export function _arrayLikeKeys(value: any, inherited?: boolean): any[] {
  const isArr       = Array.isArray(value);
  const isArg       = !isArr && isArguments(value);
  const isBuff      = !isArr && !isArg && isBuffer(value);
  const isType      = !isArr && !isArg && !isBuff && isTypedArray(value);
  const skipIndexes = isArr || isArg || isBuff || isType;
  const length      = value.length;
  const result      = new Array(skipIndexes ? length : 0);
  let index         = skipIndexes ? -1 : length;
  while (++index < length) {
    result[index] = `${index}`;
  }
  for (const key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
      !(skipIndexes && (
        // Safari 9 has enumerable `arguments.length` in strict mode.
        (key === 'length' ||
          // Skip index properties.
          _isIndex(key, length))
      ))) {
      result.push(key);
    }
  }
  return result;
}


