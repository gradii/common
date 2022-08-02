/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * The base implementation of `conformsTo` which accepts `props` to check.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 */
export function _baseConformsTo(object, source, props) {
  let length = props.length;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (length--) {
    const key = props[length];
    const predicate = source[key];
    const value = object[key];

    if ((value === undefined && !(key in object)) || !predicate(value)) {
      return false;
    }
  }
  return true;
}


