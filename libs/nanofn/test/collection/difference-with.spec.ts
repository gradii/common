import { differenceWith } from '../../src';
import { difference } from '../../src/collection/difference';


describe('difference with', function() {
  const M  = [1, 2, 3, 4];
  const M2 = [1, 2, 3, 4, 1, 2, 3, 4];

  const A = [3, 2, 1];
  const B = [4, 2];

  const AO = [{ a: 3 }, { a: 2 }, { a: 1 }];
  const BO = [{ b: 4 }, { b: 2 }];

  it('difference with predicate', () => {
    expect(differenceWith(A, B, (a, b) => a === b)).toEqual([3, 1]);
  });

  it('difference with predicate obj', () => {
    expect(differenceWith(AO, BO, (a, b) => a.a === b.b)).toEqual([{ a: 3 }, { a: 1 }]);
  });

  it('returns an empty array if there are no different elements', function() {
    expect(difference(M2, M)).toEqual([]);
    expect(difference(M, M2)).toEqual([]);
    expect(difference([], M2)).toEqual([]);
  });

});
