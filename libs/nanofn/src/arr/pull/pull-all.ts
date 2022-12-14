/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _basePullAll } from '../../_internal/base-pull-all';

/**
 * This method is like `pull` except that it accepts an array of values to remove.
 *
 * **Note:** Unlike `difference`, this method mutates `array`.
 *
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @returns {Array} Returns `array`.
 * @see pull, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pullAll(array, ['a', 'c'])
 * console.log(array)
 * // => ['b', 'b']
 */
export function pullAll(array, values) {
  return (array != null && array.length && values != null && values.length)
    ? _basePullAll(array, values)
    : array;
}


