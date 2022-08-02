/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * This base implementation of `zipObject` which assigns values using `assignFunc`.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @param {Function} assignFunc The function to assign values.
 * @returns {Object} Returns the new object.
 */
export function _baseZipObject(props, values, assignFunc) {
  let index = -1;
  const length = props.length;
  const valsLength = values.length;
  const result = {};

  while (++index < length) {
    const value = index < valsLength ? values[index] : undefined;
    assignFunc(result, props[index], value);
  }
  return result;
}


