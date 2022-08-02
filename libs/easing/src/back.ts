/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

const OVER_SHOOT = 1.70158;

/**
 * @private-exports
 */
export class BackIn {

  constructor(protected overshoot: number = OVER_SHOOT) {
  }

  public static create(overshoot: number = OVER_SHOOT) {
    return new BackIn(overshoot);
  }

  public getRatio(p: number): number {
    return p * p * ((this.overshoot + 1) * p - this.overshoot);
  }
}

/**
 * @private-exports
 */
export class BackOut {

  constructor(protected overshoot: number = OVER_SHOOT) {
  }

  public static create(overshoot: number = OVER_SHOOT) {
    return new BackOut(overshoot);
  }

  public getRatio(p: number): number {
    return ((p = p - 1) * p * ((this.overshoot + 1) * p + this.overshoot) + 1);
  }
}

/**
 * @private-exports
 */
export class BackInOut {

  constructor(protected overshoot: number = OVER_SHOOT) {
  }

  public static create(overshoot: number = OVER_SHOOT) {
    return new BackInOut(overshoot);
  }

  public getRatio(p: number): number {
    return ((p *= 2) < 1) ?
      0.5 * p * p * ((this.overshoot + 1) * p - this.overshoot) :
      0.5 * ((p -= 2) * p * ((this.overshoot + 1) * p + this.overshoot) + 2);
  }
}

export class EasingBack {
  public static easeIn: BackIn = new BackIn();
  public static easeOut: BackOut = new BackOut();
  public static easeInOut: BackInOut = new BackInOut();
}
