/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Stack } from './-stack';
import { _assignMergeValue } from './assign-merge-value';
import { _baseFor } from './base-for';
import { _baseMergeDeep } from './base-merge-deep';
import { isObject } from '../is-object';
import { keysIn } from '../keys-in';

/**
 * The base implementation of `merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
export function _baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  _baseFor(source, (srcValue, key) => {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      _baseMergeDeep(object, source, key, srcIndex, _baseMerge, customizer, stack);
    } else {
      let newValue = customizer
        ? customizer(object[key], srcValue, `${key}`, object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      _assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}


