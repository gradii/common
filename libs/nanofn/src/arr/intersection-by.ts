/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { map } from './map';
import { _baseIntersection } from '../_internal/base-intersection';
import { _castArrayLikeObject } from '../_internal/cast-array-like-object';
import { last } from './last';

/**
 * This method is like `intersection` except that it accepts `iteratee`
 * which is invoked for each element of each `arrays` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [2.1]
 */
export function intersectionBy(...arrays) {
  let iteratee = last(arrays);
  const mapped = map(arrays, _castArrayLikeObject);

  if (iteratee === last(mapped)) {
    iteratee = undefined;
  } else {
    mapped.pop();
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? _baseIntersection(mapped, iteratee)
    : [];
}


