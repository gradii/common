/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Stack } from './stack';
import { _arrayEach } from './array-each';
import { _assignValue } from './assign-value';
import { _cloneBuffer } from './clone-buffer';
import { _copyArray } from './copy-array';
import { _copyObject } from './copy-object';
import { _cloneArrayBuffer } from './clone-array-buffer';
import { _cloneDataView } from './clone-data-view';
import { _cloneRegExp } from './clone-reg-exp';
import { _cloneSymbol } from './clone-symbol';
import { _cloneTypedArray } from './clone-typed-array';
import { _copySymbols } from './copy-symbols';
import { _copySymbolsIn } from './copy-symbols-in';
import { _getAllKeys } from './get-all-keys';
import { _getAllKeysIn } from './get-all-keys-in';
import { _getTag } from './get-tag';
import { _initCloneObject } from './init-clone-object';
import { isBuffer } from '../is/is-buffer';
import { isObject } from '../is/is-object';
import { isTypedArray } from '../is/is-typed-array';
import { keys } from '../keys';
import { keysIn } from '../keys-in';

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG    = 1;
const CLONE_FLAT_FLAG    = 2;
const CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
const argsTag    = '[object Arguments]';
const arrayTag   = '[object Array]';
const boolTag    = '[object Boolean]';
const dateTag    = '[object Date]';
const errorTag   = '[object Error]';
const mapTag     = '[object Map]';
const numberTag  = '[object Number]';
const objectTag  = '[object Object]';
const regexpTag  = '[object RegExp]';
const setTag     = '[object Set]';
const stringTag  = '[object String]';
const symbolTag  = '[object Symbol]';
const weakMapTag = '[object WeakMap]';

const arrayBufferTag  = '[object ArrayBuffer]';
const dataViewTag     = '[object DataView]';
const float32Tag      = '[object Float32Array]';
const float64Tag      = '[object Float64Array]';
const int8Tag         = '[object Int8Array]';
const int16Tag        = '[object Int16Array]';
const int32Tag        = '[object Int32Array]';
const uint8Tag        = '[object Uint8Array]';
const uint8ClampedTag = '[object Uint8ClampedArray]';
const uint16Tag       = '[object Uint16Array]';
const uint32Tag       = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `clone`. */
const cloneableTags: any = {};
cloneableTags[argsTag]   = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag]  = cloneableTags[weakMapTag] = false;

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function _initCloneByTag(object, tag, isDeep) {
  const Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return _cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return _cloneDataView(object, isDeep);

    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return _cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return _cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return _cloneSymbol(object);
  }
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function _initCloneArray(array) {
  const {length} = array;
  const result   = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * The base implementation of `clone` and `cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {number} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
export function _baseClone(value: any, bitmask: number, customizer?, key?, object?, stack?): any {
  let result: any;
  const isDeep = bitmask & CLONE_DEEP_FLAG;
  const isFlat = bitmask & CLONE_FLAT_FLAG;
  const isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  const isArr = Array.isArray(value);
  const tag   = _getTag(value);
  if (isArr) {
    result = _initCloneArray(value);
    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    const isFunc = typeof value === 'function';

    if (isBuffer(value)) {
      return _cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? _copySymbolsIn(value, _copyObject(value, keysIn(value), result))
          : _copySymbols(value, Object.assign(result, value));
      }
    } else {
      if (isFunc || !cloneableTags[tag]) {
        return object ? value : {};
      }
      result = _initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  const stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (tag == mapTag) {
    value.forEach((subValue, key) => {
      result.set(key, _baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  if (tag == setTag) {
    value.forEach((subValue) => {
      result.add(_baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
    return result;
  }

  if (isTypedArray(value)) {
    return result;
  }

  const keysFunc = isFull
    ? (isFlat ? _getAllKeysIn : _getAllKeys)
    : (isFlat ? keysIn : keys);

  const props = isArr ? undefined : keysFunc(value);
  _arrayEach(props || value, (subValue, key) => {
    if (props) {
      key      = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    _assignValue(result, key, _baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}


