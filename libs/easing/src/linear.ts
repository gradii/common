/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

export class EasingLinear {
  public static easeIn = new EasingLinear;
  public static easeOut = EasingLinear.easeIn;
  public static easeInOut = EasingLinear.easeIn;

  public getRatio(p: number): number {
    return p;
  }
}
