/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { PolyIn, PolyInOut, PolyOut } from './poly';

export class EasingQuint {
  public static easeIn: PolyIn = PolyIn.create(5);

  public static easeOut: PolyOut = PolyOut.create(5);

  public static easeInOut: PolyInOut = PolyInOut.create(5);
}
