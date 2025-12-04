import { filterObj } from './filter-obj';

test('happy', () => {
  const testInput = { a: 1, b: 2, c: 3 };
  const result = filterObj(testInput, (x, prop, obj) => {
    expect(['a', 'b', 'c'].includes(prop)).toBeTruthy();
    expect(obj).toBe(testInput);
    return x > 1;
  });

  expect(result).toEqual({ b: 2, c: 3 });
});
