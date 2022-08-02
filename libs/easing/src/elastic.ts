/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

const Tau = 2 * Math.PI,
  Amplitude = 1,
  Period = 0.3;

/**
 * @private-exports
 */
export class ElasticIn {
  private readonly _p3: number;

  constructor(protected amplitude: number = Amplitude, protected period: number = Period) {
    this._p3 = Math.asin(1 / (amplitude = Math.max(1, amplitude))) * (period /= Tau);
  }

  public static create(amplitude: number, period: number): ElasticIn {
    return new ElasticIn(amplitude, period);
  }

  public getRatio(p: number): number {
    return -(this.amplitude * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * Tau / this.period));
  }
}

/**
 * @private-exports
 */
export class ElasticOut {
  private _p3: number;

  constructor(protected amplitude: number = Amplitude, protected period: number = Period) {
    this._p3 = Math.asin(1 / (amplitude = Math.max(1, amplitude))) * (period /= Tau);
  }

  public static create(amplitude: number, period: number): ElasticOut {
    return new ElasticOut(amplitude, period);
  }

  public getRatio(p: number): number {
    return this.amplitude * Math.pow(2, -10 * p) * Math.sin((p - this._p3) * Tau / this.period) + 1;
  }
}

/**
 * @private-exports
 */
export class ElasticInOut {
  private _p3: number;

  constructor(protected amplitude: number = Amplitude, protected period: number = Period) {
    this._p3 = Math.asin(1 / (amplitude = Math.max(1, amplitude))) * (period /= Tau);
  }

  public static create(amplitude: number, period: number): ElasticInOut {
    return new ElasticInOut(amplitude, period);
  }

  public getRatio(p: number): number {
    if ((p *= 2) < 1) {
      return -(this.amplitude * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * Tau / this.period)) / 2;
    } else {
      return (this.amplitude * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - this._p3) * Tau / this.period) + 2) / 2;
    }
  }
}

export class EasingElastic {
  public static easingIn: ElasticIn = new ElasticIn();
  public static easingOut: ElasticOut = new ElasticOut();
  public static easingInOut: ElasticInOut = new ElasticInOut();
}
