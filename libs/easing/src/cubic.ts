/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { PolyIn, PolyInOut, PolyOut } from './poly';

export class EasingCubic {
  public static easeIn: PolyIn = PolyIn.create(3);

  public static easeOut: PolyOut = PolyOut.create(3);

  public static easeInOut: PolyInOut = PolyInOut.create(3);
}
