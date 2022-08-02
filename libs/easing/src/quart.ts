/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { PolyIn, PolyInOut, PolyOut } from './poly';

export class EasingQuart {
  public static easeIn: PolyIn = PolyIn.create(4);

  public static easeOut: PolyOut = PolyOut.create(4);

  public static easeInOut: PolyInOut = PolyInOut.create(4);
}
