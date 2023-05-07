import { type } from '../lang/type';
import { _cloneRegExp } from './_cloneRegExp';


/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @param map
 * @return {*} The copied value.
 */
export function _clone(value: any, deep: boolean, map = new _ObjectMap()) {

  // this avoids the slower switch with a quick if decision removing some milliseconds in each run.
  if (_isPrimitive(value)) {
    return value;
  }

  const copy = function copy(copiedValue: any) {
    // Check for circular and same references on the object graph and return its corresponding clone.
    const cachedCopy = map.get(value);

    if (cachedCopy) {
      return cachedCopy;
    }

    map.set(value, copiedValue);

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        copiedValue[key] = deep ? _clone(value[key], true, map) : value[key];
      }
    }
    return copiedValue;
  };

  switch (type(value)) {
    case 'Object':
      return copy(Object.create(Object.getPrototypeOf(value)));
    case 'Array':
      return copy([]);
    case 'Date':
      return new Date(value.valueOf());
    case 'RegExp':
      return _cloneRegExp(value);
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'BigInt64Array':
    case 'BigUint64Array':
      return value.slice();
    default:
      return value;
  }
}

function _isPrimitive(param: any) {
  const type = typeof param;
  return param == null || (type != 'object' && type != 'function');
}

class _ObjectMap {
  map: Record<string, any> = {};
  length                   = 0;

  set(key: string, value: any) {
    const hashedKey = this.hash(key);

    let bucket = this.map[hashedKey];
    if (!bucket) {
      this.map[hashedKey] = bucket = [];
    }

    bucket.push([key, value]);
    this.length += 1;
  };

  hash(key: any) {
    const hashedKey = [];
    for (const value in key) {
      hashedKey.push(Object.prototype.toString.call(key[value]));
    }
    return hashedKey.join('#');
  };

  get(key: string) {
    /**
     * depending on the number of objects to be cloned is faster to just iterate over the items in the map just because the hash function is so costly,
     * on my tests this number is 180, anything above that using the hash function is faster.
     */
    if (this.length <= 180) {

      for (const p in this.map) {
        const bucket = this.map[p];

        for (let i = 0; i < bucket.length; i += 1) {
          const element = bucket[i];
          if (element[0] === key) {
            return element[1];
          }
        }

      }
      return;
    }

    const hashedKey = this.hash(key);
    const bucket    = this.map[hashedKey];

    if (!bucket) {
      return;
    }

    for (let i = 0; i < bucket.length; i += 1) {
      const element = bucket[i];
      if (element[0] === key) {
        return element[1];
      }
    }

  }
}

