import { pick } from './pick';

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

test('props to pick is a string', () => {
  const result = pick(obj, 'a,c'.split(','));
  const expectedResult = {
    a: 1,
    c: 3,
  };

  expect(result).toEqual(expectedResult);
});

test('when prop is missing', () => {
  const result = pick(obj, 'a,d,f'.split(','));
  expect(result).toEqual({ a: 1 });
});

test('props to pick is an array', () => {
  expect(
    pick({
      a: 'foo',
      b: 'bar',
    }, ['a', 'c'])
  ).toEqual({
    a: 'foo',
  });
});
