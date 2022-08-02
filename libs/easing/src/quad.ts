/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { PolyIn, PolyInOut, PolyOut } from './poly';

export class EasingQuad {
  public static easeIn: PolyIn = PolyIn.create(2);

  public static easeOut: PolyOut = PolyOut.create(2);

  public static easeInOut: PolyInOut = PolyInOut.create(2);
}
