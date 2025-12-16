import { reject } from './reject';

test('happy', () => {
  const testInput = { a: 1, b: 2, c: 3 };
  const result = reject(testInput, (x, prop, obj) => {
    expect(['a', 'b', 'c'].includes(prop)).toBeTruthy();
    expect(obj).toBe(testInput);
    return x > 1;
  });
  expect(result).toEqual({ a: 1 });
});
