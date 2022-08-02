/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/** Used for built-in method references. */
const objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
export function _isPrototype(value) {
  const Ctor = value && value.constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}


