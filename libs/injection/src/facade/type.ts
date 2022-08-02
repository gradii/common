/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */



/**
 * @whatItDoes Represents a type that a Component or other object is instances of.
 *
 * @description
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @stable
 */
export const Type = Function;

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}

export interface Type<T = object> extends Function {
  new (...args: any[]): T;
}
