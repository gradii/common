function _includesWith<T, R>(list: R[], x: T, pred: (valueX: T, valueListItem: R) => boolean): boolean {
  let idx   = 0;
  const len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param first The first list.
 * @param second The second list.
 * @param predicate A predicate used to test whether two items are equal.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @example
 *
 *      const cmp = (x, y) => x.a === y.a;
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      const l2 = [{a: 3}, {a: 4}];
 *      differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 *
 *      differenceWith(equals, [1, 2, 3, 3, 3], []); //=> [1, 2, 3]
 *      differenceWith(equals, [1, 2, 3, 3, 3], [1]); //=> [2, 3]
 */
export function differenceWith<T = any, R = any>(first: T[], second: R[],
                                                 predicate: (valueFirst: T, valueSecond: R) => boolean): any[] {
  const out: any[] = [];
  let idx          = 0;
  const firstLen   = first.length;
  while (idx < firstLen) {
    if (!_includesWith(second, first[idx], predicate) &&
      !_includesWith(out, first[idx], predicate)) {
      out.push(first[idx]);
    }
    idx += 1;
  }
  return out;
}
