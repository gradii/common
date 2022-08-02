/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

function isObject(item: any) {
  return item !== null && typeof item === 'object' && Object.prototype.toString.call(item) === '[object Object]';
}

const EPSILON = 0.00001;

// @ts-ignore
expect.extend({
  // @ts-ignore
  toBeEqualish(actual: any, expected: any) {
    const notEqual = () => `actual ${actual} expected ${expected} not equalish`;

    if (typeof actual === 'number') {
      return {
        pass: Math.abs(actual - expected) < EPSILON, message: notEqual
      };
    }

    if (isObject(actual) && actual[Symbol.toPrimitive]) {
      actual = actual[Symbol.toPrimitive]();
    }

    if (isObject(expected) && expected[Symbol.toPrimitive]) {
      expected = expected[Symbol.toPrimitive]();
    }

    if (actual.length !== expected.length) {
      return {pass: false, message: notEqual};
    }
    for (let i = 0; i < actual.length; i++) {
      if (isNaN(actual[i]) !== isNaN(expected[i])) {
        return {pass: false, message: notEqual};
      }
      if (Math.abs(actual[i] - expected[i]) >= EPSILON) {
        return {pass: false, message: notEqual};
      }
    }
    return {pass: true, message: notEqual};
  },
});

interface PrimitiveAble {
  [Symbol.toPrimitive]();
}

// tslint:disable-next-line:no-namespace
declare namespace jasmine {
  // tslint:disable-next-line:interface-name
  interface Matchers<T> {
    toBeEqualish(expected: number | number[] | Float32Array | PrimitiveAble | any): boolean;
  }
}


// tslint:disable-next-line:no-namespace
declare namespace jest {
  // tslint:disable-next-line:interface-name
  // @ts-ignore
  interface Matchers<T> {
    toBeEqualish(expected: number | number[] | Float32Array | PrimitiveAble | any): boolean;
  }
}
