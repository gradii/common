/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * @private-exports
 */
export class ExpIn {

  public getRatio(p: number): number {
    return p === 0.0 ? p : Math.pow(2.0, 10.0 * (p - 1.0));
  }
}

/**
 * @private-exports
 */
export class ExpOut {

  public getRatio(p: number): number {
    return p === 1.0 ? 1 : 1 - Math.pow(2, -10 * p);
  }
}

/**
 * @private-exports
 */
export class ExpInOut {

  public getRatio(p: number): number {
    if (p === 0.0 || p === 1.0) {
      return p;
    } else {
      if ((p *= 2) < 1) {
        return 0.5 * Math.pow(2, 10 * (p - 1));
      } else {
        return 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
      }
    }
  }
}

export class EasingExp {
  public static easeIn: ExpIn = new ExpIn();
  public static easeOut: ExpOut = new ExpOut();
  public static easeInOut: ExpInOut = new ExpInOut();
}
