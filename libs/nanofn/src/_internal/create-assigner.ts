/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _isIterateeCall } from './is-iteratee-call';

/**
 * Creates a function like `assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
export function _createAssigner(assigner) {
  return (object, ...sources) => {
    let index = -1;
    let length = sources.length;
    let customizer = length > 1 ? sources[length - 1] : undefined;
    const guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer === 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      const source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  };
}


