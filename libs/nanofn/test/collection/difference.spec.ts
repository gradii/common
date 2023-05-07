import { difference } from '../../src/collection/difference';


describe('difference', function () {
  const M  = [1, 2, 3, 4];
  const M2 = [1, 2, 3, 4, 1, 2, 3, 4];
  const N  = [3, 4, 5, 6];
  const N2 = [3, 3, 4, 4, 5, 5, 6, 6];
  const Z  = [3, 4, 5, 6, 10];
  const Z2 = [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];

  const A = [3, 2, 1];
  const B = [4, 2];
  it('finds the set of all elements in the first list not contained in the second', function () {
    expect(difference(M, N)).toEqual([1, 2]);
    expect(difference(A, B)).toEqual([3, 1])
  });

  it('does not allow duplicates in the output even if the input lists had duplicates', function () {
    expect(difference(M2, N2)).toEqual([1, 2]);
  });

  it('has equals semantics', function () {
    expect(difference([0], [-0]).length).toEqual(0);
    expect(difference([-0], [0]).length).toEqual(0);
    expect(difference([NaN], [NaN]).length).toEqual(0);
    expect(difference([42], [42]).length).toEqual(0);
  });

  it('works for arrays of different lengths', function () {
    expect(difference(Z, Z2)).toEqual([10]);
    expect(difference(Z2, Z)).toEqual([1, 2, 7, 8]);
  });

  it('will not create a "sparse" array', function () {
    expect(difference(M2, [3]).length).toEqual(3);
  });

  it('returns an empty array if there are no different elements', function () {
    expect(difference(M2, M)).toEqual([]);
    expect(difference(M, M2)).toEqual([]);
    expect(difference([], M2)).toEqual([]);
  });

});
