/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { map } from '../map';
import { _baseAt } from '../../_internal/base-at';
import { _basePullAt } from '../../_internal/base-pull-at';
import { _compareAscending } from '../../_internal/compare-ascending';
import { _isIndex } from '../../_internal/is-index';

/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * **Note:** Unlike `at`, this method mutates `array`.
 *
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @returns {Array} Returns the new array of removed elements.
 * @see pull, pullAll, pullAllBy, pullAllWith, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'd']
 * const pulled = pullAt(array, [1, 3])
 *
 * console.log(array)
 * // => ['a', 'c']
 *
 * console.log(pulled)
 * // => ['b', 'd']
 */
export function pullAt(array, ...indexes) {
  const length = array == null ? 0 : array.length;
  const result = _baseAt(array, indexes);

  _basePullAt(array, map(indexes, (index) => _isIndex(index, length) ? +index : index).sort(_compareAscending));
  return result;
}


