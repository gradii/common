/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

export class CircleIn {

  public getRatio(p: number): number {
    return -(Math.sqrt(1 - p * p) - 1);
  }
}

/**
 * @private-exports
 */
export class CircleOut {

  public getRatio(p: number): number {
    return Math.sqrt(1 - (p -= 1) * p);
  }
}

/**
 * @private-exports
 */
export class CircleInOut {

  public getRatio(p: number): number {
    if ((p *= 2) <= 1) {
      return (-(Math.sqrt(1 - p * p) - 1)) / 2;
    } else {
      return (Math.sqrt(1 - (p -= 2) * p) + 1) / 2;
    }
  }
}

export class EasingCircle {
  public static easeIn: CircleIn = new CircleIn();
  public static easeOut: CircleOut = new CircleOut();
  public static easeInOut: CircleInOut = new CircleInOut();
}
