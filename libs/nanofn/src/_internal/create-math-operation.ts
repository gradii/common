/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseToNumber } from './base-to-number';
import { _baseToString } from './base-to-string';

/**
 * Creates a function that performs a mathematical operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @param {number} [defaultValue] The value used for `undefined` arguments.
 * @returns {Function} Returns the new mathematical operation function.
 */
export function _createMathOperation(operator: (value: any, other: any) => number,
                                     defaultValue: any): (value: any, other: any) => number {
  return (value, other) => {
    if (value === undefined && other === undefined) {
      return defaultValue;
    }
    if (value !== undefined && other === undefined) {
      return value;
    }
    if (other !== undefined && value === undefined) {
      return other;
    }
    if (typeof value === 'string' || typeof other === 'string') {
      value = _baseToString(value);
      other = _baseToString(other);
    } else {
      value = _baseToNumber(value);
      other = _baseToNumber(other);
    }
    return operator(value, other);
  };
}


