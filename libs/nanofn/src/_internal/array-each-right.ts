/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * A specialized version of `forEachRight` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
export function _arrayEachRight(array: any[],
                                iteratee: (value: any, index: number,
                                           array: any[]) => boolean | void) {
  let length = array == null ? 0 : array.length;

  while (length--) {
    if (iteratee(array[length], length, array) === false) {
      break;
    }
  }
  return array;
}


