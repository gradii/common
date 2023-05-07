import { intersection } from '../../src/collection/intersection';


describe('intersection', function() {
  const M = [1, 2, 3, 4];
  const M2 = [1, 2, 3, 4, 1, 2, 3, 4];
  const N = [3, 4, 5, 6];
  const N2 = [3, 3, 4, 4, 5, 5, 6, 6];
  it('combines two lists into the set of common elements', function() {
    expect(intersection(M, N)).toEqual( [3, 4]);
  });

  it('does not allow duplicates in the output even if the input lists had duplicates', function() {
    expect(intersection(M2, N2)).toEqual(  [3, 4]);
  });

  it('does not allow duplicates in the output even if the first list is bigger and has duplicates', function() {
    expect(intersection(M2, N)).toEqual(  [3, 4]);
  });

  it('does not allow duplicates in the output even if the second list is bigger and has duplicates', function() {
    expect(intersection(M, N2)).toEqual(  [3, 4]);
  });

  it('has R.equals semantics', function() {
    expect(intersection([0], [-0]).length).toEqual(  1);
    expect(intersection([-0], [0]).length).toEqual(  1);
    expect(intersection([NaN], [NaN]).length).toEqual(  1);
  });

});
