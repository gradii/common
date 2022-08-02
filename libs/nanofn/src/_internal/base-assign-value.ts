/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
export function _baseAssignValue(object: any,
                                 key: string | symbol,
                                 value: any): any {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable'  : true,
      'value'       : value,
      'writable'    : true
    });
  } else {
    object[key] = value;
  }
}


