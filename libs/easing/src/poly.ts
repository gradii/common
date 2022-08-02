/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

const Exponent = 3;

/**
 * @private-exports
 */
export class PolyIn {
  constructor(protected exponent = Exponent) {
  }

  public static create(exponent: number) {
    return new PolyIn(exponent);
  }

  public getRatio(p: number): number {
    return Math.pow(p, this.exponent);
  }
}

/**
 * @private-exports
 */
export class PolyOut {
  constructor(protected exponent = Exponent) {
  }

  public static create(exponent: number) {
    return new PolyOut(exponent);
  }

  public getRatio(p: number): number {
    return 1 - Math.pow(1 - p, this.exponent);
  }
}

/**
 * @private-exports
 */
export class PolyInOut {
  constructor(protected exponent = Exponent) {
  }

  public static create(exponent: number) {
    return new PolyInOut(exponent);
  }

  public getRatio(p: number): number {
    if ((p *= 2) <= 1) {
      return Math.pow(p, this.exponent) / 2;
    } else {
      return (2 - Math.pow(2 - p, this.exponent)) / 2;
    }
  }
}

export class EasingPoly {
  public static easeIn: PolyIn = new PolyIn();
  public static easeOut: PolyOut = new PolyOut();
  public static easeInOut: PolyInOut = new PolyInOut();
}
