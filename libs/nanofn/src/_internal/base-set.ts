/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _assignValue } from './assign-value';
import { _castPath } from './cast-path';
import { _isIndex } from './is-index';
import { isObject } from '../is/is-object';
import { _toKey } from './to-key';

/**
 * The base implementation of `set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
export function _baseSet(object: any,
                         path: string | string[],
                         value: any,
                         customizer?: Function) {
  if (!isObject(object)) {
    return object;
  }
  path = _castPath(path, object);

  const length    = path.length;
  const lastIndex = length - 1;

  let index       = -1;
  let nested: any = object;

  while (nested != null && ++index < length) {
    const key    = _toKey(path[index]);
    let newValue = value;

    if (index != lastIndex) {
      const objValue = nested[key];
      newValue       = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        if (isObject(objValue)) {
          newValue = objValue;
        } else {
          newValue = _isIndex(path[index + 1]) ? [] : {};
        }
      }
    }
    _assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}


