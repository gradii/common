/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

const b1 = 4 / 11,
  b2 = 6 / 11,
  b3 = 8 / 11,
  b4 = 3 / 4,
  b5 = 9 / 11,
  b6 = 10 / 11,
  b7 = 15 / 16,
  b8 = 21 / 22,
  b9 = 63 / 64,
  b0 = 1 / b1 / b1;

/**
 * @private-exports
 */
export class BounceIn {

  public getRatio(p: number): number {
    if ((p = 1 - p) < b1) {
      return 1 - (b0 * p * p);
    } else if (p < b3) {
      return 1 - (b0 * (p -= b2) * p + b4);
    } else if (p < b6) {
      return 1 - (b0 * (p -= b5) * p + b7);
    } else {
      return 1 - (b0 * (p -= b8) * p + b9);
    }
  }
}

/**
 * @private-exports
 */
export class BounceOut {

  public getRatio(p: number): number {
    if (p < b1) {
      return b0 * p * p;
    } else if (p < b3) {
      return b0 * (p -= b2) * p + b4;
    } else if (p < b6) {
      return b0 * (p -= b5) * p + b7;
    } else {
      return b0 * (p -= b8) * p + b9;
    }
  }
}

/**
 * @private-exports
 */
export class BounceInOut {

  public getRatio(p: number): number {
    let invert: boolean = false;
    if (p < 0.5) {
      invert = true;
      p = 1 - (p * 2);
    } else {
      p = (p * 2) - 1;
    }
    if (p < b1) {
      p = b0 * p * p;
    } else if (p < b3) {
      p = b0 * (p -= b2) * p + b4;
    } else if (p < b6) {
      p = b0 * (p -= b5) * p + b7;
    } else {
      p = b0 * (p -= b8) * p + b9;
    }
    return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
  }
}

export class EasingBounce {
  public static easeIn: BounceIn = new BounceIn();
  public static easeOut: BounceOut = new BounceOut();
  public static easeInOut: BounceInOut = new BounceInOut();
}
