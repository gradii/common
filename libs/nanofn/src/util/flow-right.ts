/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { flow } from './flow';

/**
 * This method is like `flow` except that it composes a function that
 * invokes the given functions from right to left.
 *
 * @category Util
 * @param {Function[]} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see flow
 * @example
 *
 * import { add } from 'lodash/add'
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const addSquare = flowRight(square, add)
 * addSquare(1, 2)
 * // => 9
 */
export function flowRight(...funcs) {
  return flow(...funcs.reverse());
}


