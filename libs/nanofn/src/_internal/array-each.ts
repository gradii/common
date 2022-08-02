/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * A specialized version of `forEach` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
export function _arrayEach(array: any[],
                           iteratee: (value: any, index: number, array: any[]) => boolean | void
): any[] {
  let index    = -1;
  const length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}


