/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Vector3 } from './vector3';

/**
 * Defines a result of an intersection test.
 */
export class IntersectionResult {
  /**
   * The penetration depth of the intersection.
   */
  public depth: number;

  /**
   * The [axis] of the intersection.
   */
  public axis = Vector3.zero();
}
