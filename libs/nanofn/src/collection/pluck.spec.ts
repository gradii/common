import { pluck } from './pluck';

test('happy', () => {
  expect(pluck([{ a: 1 }, { a: 2 }, { b: 1 }], 'a')).toEqual([1, 2]);
});

test('with undefined', () => {
  expect(pluck([{ a: 1 }, { a: 2 }, { b: 1 }], undefined)).toEqual([]);
});
