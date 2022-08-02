/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

const _HALF_PI = Math.PI / 2;

/**
 * @private-exports
 */
export class SinIn {

  public getRatio(p: number): number {
    return -Math.cos(p * _HALF_PI) + 1;
  }
}

/**
 * @private-exports
 */
export class SinOut {

  public getRatio(p: number): number {
    return Math.sin(p * _HALF_PI);
  }
}

/**
 * @private-exports
 */
export class SinInOut {

  public getRatio(p: number): number {
    return -0.5 * (Math.cos(Math.PI * p) - 1);
  }
}

export class EasingSin {
  public static easeIn: SinIn = new SinIn();
  public static easeOut: SinOut = new SinOut();
  public static easeInOut: SinInOut = new SinInOut();
}
