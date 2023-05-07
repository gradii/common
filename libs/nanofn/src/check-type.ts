/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

export function isPresent(value: null | undefined): false;
export function isPresent(value: any): boolean;
export function isPresent(value: any): boolean {
  return value !== null && value !== undefined;
}

export function isBlank(value: any): value is (null | undefined) {
  return value === null || value === undefined;
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}

export function isInteger(value: any): value is number {
  // tslint:disable-next-line:no-bitwise
  return value << 0 === value;
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isObject(item: any): item is Record<string, any> {
  return item !== null && typeof item === 'object' && Object.prototype.toString.call(
    item) === '[object Object]';
}

export function isObjectLike(val: any): val is object {
  return typeof val === 'object' && val !== null;
}

export function isRegex(value: any): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

export function isTruthy(value: any): value is true {
  return !!value;
}

export function isNullOrEmptyString(value: any) {
  return isBlank(value) || (isString(value) && value.trim().length === 0);
}

export function isNotNullOrEmptyString(value: any) {
  return !isNullOrEmptyString(value);
}

export function isNumeric(value: any) {
  return !isNaN(value - parseFloat(value));
}

export function isDate(value: any): value is Date {
  return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

export function isMap(item: any): boolean {
  return typeof item === 'object' && Object.prototype.toString.call(item) === '[object Map]';
}

export function isSet(item: any): boolean {
  return typeof item === 'object' && Object.prototype.toString.call(item) === '[object Set]';
}

export function isSymbol(item: any): boolean {
  return typeof item === 'symbol';
}

export function isBoolean(value: any): value is boolean {
  return value === true || value === false;
}

export function isPromise<T = any>(obj: any): obj is Promise<T> {
  // allow any Promise/A+ compliant thenable.
  // It's up to the caller to ensure that obj.then conforms to the spec
  return !!obj && typeof obj.then === 'function';
}

export function isInfinite(result: any) {
  return result === Number.POSITIVE_INFINITY || result === Number.NEGATIVE_INFINITY;
}

export function isEquivalent(a: any, b: any) {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  if (aProps.length !== bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}

export function isNonEmptyString(value: any): boolean { // tslint:disable-line:no-any
  return typeof value === 'string' && value !== '';
}

export function isObjectEmpty(value: any): boolean {
  return !Object.keys(value).length;
}

export function isStringEmpty(value: any): boolean {
  return !(isString(value) && value.length > 0);
}

export function has(obj: any, prop: string) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isAnyEmpty(value: any): boolean {
  if (isBlank(value)) {
    return true;
  }
  if (isString(value) || isArray(value)) {
    return !value.length;
  }
  if (isMap(value) || isSet(value)) {
    return !value.size;
  }
  if (isObject(value)) {
    return !Object.keys(value).length;
  }
  if (isDate(value)) {
    return false;
  }
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

export function isIterable(x: any) {
  if (isArray(x)) {
    return true;
  }
  // @ts-ignore
  return isObject(x) && Symbol.iterator in x && isFunction(x[Symbol.iterator]);
}
