/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
export function _composeArgsRight(args, partials, holders, isCurried) {
  let argsIndex = -1;
  let holdersIndex = -1;
  let rightIndex = -1;

  const argsLength = args.length;
  const holdersLength = holders.length;
  const rightLength = partials.length;
  const rangeLength = Math.max(argsLength - holdersLength, 0);
  const result = new Array(rangeLength + rightLength);
  const isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  const offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}


