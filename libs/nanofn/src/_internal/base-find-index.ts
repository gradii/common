/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * The base implementation of `findIndex` and `findLastIndex`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
export function _baseFindIndex(array: any[],
                               predicate: (val: any, idx: number, target: any) => boolean,
                               fromIndex: number,
                               fromRight?: boolean): number {
  const {length} = array;
  let index      = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}


