import { uniq } from './uniq';
/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @example
 *
 *      intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */

export function intersection(list1: any[], list2: any[]): any[] {
  return uniq(list2.filter((value2) => list1.includes(value2)));
}
