import { _lastIndexOf } from '../fn/equals';

/**
 * It returns the last index of `target` in `list` array.
 *
 * `R.equals` is used to determine equality between `target` and members of `list`.
 *
 * If there is no such index, then `-1` is returned.
 */
export function lastIndexOf<T>(list: T[], target: T): number;

export function lastIndexOf(list: any[], valueToFind: any): number {
  return _lastIndexOf(valueToFind, list);
}