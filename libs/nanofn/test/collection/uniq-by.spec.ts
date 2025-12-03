// import { uniqBy } from 'ramda';

import { uniqBy } from '../../src/collection/uniq-by';

describe('uniqBy', function() {

  it('returns a set from any array based on predicate', function() {
    expect(uniqBy([-2, -1, 0, 1, 2], Math.abs)).toEqual([-2, -1, 0]);
  });

  it('keeps elements from the left', function() {
    expect(uniqBy([-1, 2, 4, 3, 1, 3], Math.abs)).toEqual([-1, 2, 4, 3]);
  });

  it('returns an empty array for an empty array', function() {
    expect(uniqBy([], x => x)).toEqual([]);
  });

  it('has R.equals semantics', function() {
    expect(uniqBy([-0, 0], x => x)).toEqual([-0]);
    expect(uniqBy([NaN, NaN], x => x)).toEqual([NaN]);
    expect(uniqBy([], x => x)).toEqual([]);
  });

});
