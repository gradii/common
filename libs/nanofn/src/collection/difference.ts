/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param first The first list.
 * @param second The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @example
 *
 *      difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */
export function difference(first: any[], second: any[]): any[] {
  const out         = [];
  let idx           = 0;
  const firstLen    = first.length;
  const secondLen   = second.length;
  const toFilterOut = new Set();

  for (let i = 0; i < secondLen; i += 1) {
    toFilterOut.add(second[i]);
  }

  while (idx < firstLen) {
    if (!toFilterOut.has(first[idx])) {
      toFilterOut.add(first[idx]);
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
}
