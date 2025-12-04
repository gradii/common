import { omit } from './omit.js'

test('with string as condition', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
  }
  const result = omit(obj, 'a,c'.split(','))
  const expectedResult = { b: 2 }

  expect(result).toEqual(expectedResult)
})

test('with array as condition', () => {
  expect(
    omit(
      {
        a: 'foo',
        b: 'bar',
        c: 'baz',
      },
      ['a', 'c', 'd'],
    ),
  ).toEqual({ b: 'bar' });
})
