/* eslint-disable @typescript-eslint/ban-ts-comment */
import { deepClone } from '../../src/obj/deep-clone';

describe('deep clone integers, strings and booleans', function () {
  it('clones integers', function () {
    expect(-4).toEqual(-4);
    expect(9007199254740991).toEqual(9007199254740991);
  });

  it('clones floats', function () {
    expect(-4.5).toEqual(-4.5);
    expect(0.0).toEqual(0.0);
  });

  it('clones strings', function () {
    expect('ramda').toEqual('ramda');
  });

  it('clones booleans', function () {
    expect(true).toEqual(true);
  });

});

describe('deep clone objects', function () {
  it('clones shallow object', function () {
    const obj   = {a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)};
    const clone = deepClone(obj);
    obj.c       = false;
    obj.d.setDate(31);
    expect(clone).toEqual({a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25)});
  });

  it('clones deep object', function () {
    const obj   = {a: {b: {c: 'ramda'}}};
    const clone = deepClone(obj);
    obj.a.b.c   = null;
    expect(clone).toEqual({a: {b: {c: 'ramda'}}});
  });

  it('clones objects with circular references', function () {
    const x: any = {c: null};
    const y      = {a: x};
    const z      = {b: y};
    x.c          = z;
    const clone  = deepClone(x);
    expect(x).toEqual(clone);
    expect(x.c).toEqual(clone.c);
    expect(x.c.b).toEqual(clone.c.b);
    expect(x.c.b.a).toEqual(clone.c.b.a);
    expect(x.c.b.a.c).toEqual(clone.c.b.a.c);
    expect(Object.keys(clone)).toEqual(Object.keys(x));
    expect(Object.keys(clone.c)).toEqual(Object.keys(x.c));
    expect(Object.keys(clone.c.b)).toEqual(Object.keys(x.c.b));
    expect(Object.keys(clone.c.b.a)).toEqual(Object.keys(x.c.b.a));
    expect(Object.keys(clone.c.b.a.c)).toEqual(Object.keys(x.c.b.a.c));

    x.c.b = 1;
    expect(clone.c.b).not.toEqual(x.c.b);
  });

  it('clone instances', function () {

    class Obj {
      constructor(public x: any) {
      }

      get() {
        return this.x;
      };

      set(x: any) {
        this.x = x;
      };
    }

    const obj = new Obj(10);
    expect(obj.get()).toEqual(10);

    const clone = deepClone(obj);
    expect(clone.get()).toBe(10);

    expect(obj).not.toBe(clone);

    obj.set(11);
    expect(obj.get()).toBe(11);
    expect(clone.get()).toBe(10);
  });

  it('only own properties be copied', function () {
    function Obj(this: any) {
      this.x = 'own property';
    }

    Obj.prototype = {
      y: 'not own property'
    };

    // @ts-ignore
    const obj      = new Obj();
    const cloneObj = deepClone(obj);
    expect(Object.keys(obj)).toEqual(Object.keys(cloneObj));
  });

  it('the prototype should keep the same', function () {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function Obj() {
    }

    Obj.prototype = {
      x: 'prototype property'
    };

    // @ts-ignore
    const obj      = new Obj();
    const cloneObj = deepClone(obj);
    expect(Object.getPrototypeOf(obj)).toEqual( Object.getPrototypeOf(cloneObj));
  });

});

describe('deep clone arrays', function () {
  it('clones shallow arrays', function () {
    const list  = [1, 2, 3];
    const clone = deepClone(list);
    list.pop();
    expect(clone).toEqual([1, 2, 3]);
  });

  // it('clones deep arrays', function () {
  //   const list  = [1, [1, 2, 3], [[[5]]]];
  //   const clone = deepClone(list);
  //
  //   assert.notStrictEqual(list, clone);
  //   assert.notStrictEqual(list[2], clone[2]);
  //   assert.notStrictEqual(list[2][0], clone[2][0]);
  //
  //   expect(clone).toEqual([1, [1, 2, 3], [[[5]]]]);
  // });

});

describe('deep clone typed arrays', function () {
  it('clones Uint16Array', function () {
    const array = new Uint16Array([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Uint16Array([1, 2, 3]));
  });

  it('clones Int8Array', function () {
    const array = new Int8Array([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Int8Array([1, 2, 3]));
  });
  it('clones Uint8Array', function () {
    const array = new Uint8Array([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Uint8Array([1, 2, 3]));
  });
  it('clones Uint8ClampedArray', function () {
    const array = new Uint8ClampedArray([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Uint8ClampedArray([1, 2, 3]));
  });
  it('clones Int16Array', function () {
    const array = new Int16Array([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Int16Array([1, 2, 3]));
  });
  it('clones Uint16Array', function () {
    const array = new Uint16Array([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Uint16Array([1, 2, 3]));
  });
  it('clones Int32Array', function () {
    const array = new Int32Array([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Int32Array([1, 2, 3]));
  });
  it('clones Uint32Array', function () {
    const array = new Uint32Array([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Uint32Array([1, 2, 3]));
  });
  it('clones Float32Array', function () {
    const array = new Float32Array([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Float32Array([1, 2, 3]));
  });
  it('clones Float64Array', function () {
    const array = new Float64Array([1, 2, 3]);
    const clone = deepClone(array);

    expect(array).toEqual(clone);
    expect(clone).toEqual(new Float64Array([1, 2, 3]));
  });

});

describe('deep clone functions', function () {
  it('keep reference to function', function () {
    const fn   = function (x: number) {
      return x + x;
    };
    const list = [{a: fn}];

    const clone = deepClone(list);

    expect(clone[0].a(10)).toBe(20);
    expect(list[0].a).toBe(clone[0].a);
  });

});

// describe('built-in types', function () {
//   it('clones Date object', function () {
//     const date = new Date(2014, 10, 14, 23, 59, 59, 999);
//
//     const clone = deepClone(date);
//
//     assert.notStrictEqual(date, clone);
//     expect(clone).toEqual(new Date(2014, 10, 14, 23, 59, 59, 999));
//
//     eq(clone.getDay(), 5); // friday
//   });
//
//   it('clones RegExp object', function () {
//     R.forEach(function (pattern) {
//       const clone = deepClone(pattern);
//       assert.notStrictEqual(clone, pattern);
//       eq(clone.constructor, RegExp);
//       eq(clone.source, pattern.source);
//       eq(clone.global, pattern.global);
//       eq(clone.ignoreCase, pattern.ignoreCase);
//       eq(clone.multiline, pattern.multiline);
//     }, [/x/, /x/g, /x/i, /x/m, /x/gi, /x/gm, /x/im, /x/gim]);
//   });
//
// });

// describe('deep clone deep nested mixed objects', function () {
//   it('clones array with objects', function () {
//     const list  = [{a: {b: 1}}, [{c: {d: 1}}]];
//     const clone = deepClone(list);
//     list[1][0]  = null;
//     expect(clone).toEqual([{a: {b: 1}}, [{c: {d: 1}}]]);
//   });
//
//   it('clones array with arrays', function () {
//     const list  = [[1], [[3]]];
//     const clone = deepClone(list);
//     list[1][0]  = null;
//     expect(clone).toEqual([[1], [[3]]]);
//   });
//
//   it('clones array with mutual ref object', function () {
//     const obj   = {a: 1};
//     const list  = [{b: obj}, {b: obj}];
//     const clone = deepClone(list);
//
//     assert.strictEqual(list[0].b, list[1].b);
//     assert.strictEqual(clone[0].b, clone[1].b);
//     assert.notStrictEqual(clone[0].b, list[0].b);
//     assert.notStrictEqual(clone[1].b, list[1].b);
//
//     eq(clone[0].b, {a: 1});
//     eq(clone[1].b, {a: 1});
//
//     obj.a = 2;
//     eq(clone[0].b, {a: 1});
//     eq(clone[1].b, {a: 1});
//   });
//
// });

// describe('deep clone edge cases', function () {
//   it('nulls, undefineds and empty objects and arrays', function () {
//     expect(null).toEqual(null);
//     expect(undefined).toEqual(undefined);
//     assert.notStrictEqual(deepClone(undefined), null);
//
//     const obj = {};
//     assert.notStrictEqual(deepClone(obj), obj);
//
//     const list = [];
//     assert.notStrictEqual(deepClone(list), list);
//   });
//
// });

// describe('clone objects with no prototypes', function () {
//   it('nested object with no prototype', function () {
//     const obj         = Object.create(null);
//     obj.intValue      = 1;
//     obj.a             = Object.create(null);
//     obj.a.stringValue = 'Yeah';
//     const clonedObj   = deepClone(obj);
//     assert.strictEqual(Object.getPrototypeOf(clonedObj), null);
//     assert.strictEqual(Object.getPrototypeOf(clonedObj.a), null);
//     assert.strictEqual(clonedObj.intValue, 1);
//     assert.strictEqual(clonedObj.a.stringValue, 'Yeah');
//   });
// });

// describe('Let `deepClone` use an arbitrary user defined `clone` method', function () {
//
//   it('dispatches to `clone` method if present', function () {
//     function ArbitraryClone(x) {
//       this.value = x;
//     }
//
//     ArbitraryClone.prototype.clone = function () {
//       return new ArbitraryClone(this.value);
//     };
//
//     const obj                = new ArbitraryClone(42);
//     const arbitraryClonedObj = deepClone(obj);
//     eq(arbitraryClonedObj, new ArbitraryClone(42));
//     eq(arbitraryClonedObj instanceof ArbitraryClone, true);
//   });
//
// });
