/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Vector3 } from './vector3';

export class Plane {
  constructor(other?: Plane);

  constructor(x: number, y: number, z: number, w: number);

  constructor(normal: Vector3, constant: number);

  constructor(x?: number | Plane | Vector3, y?: number, z?: number, w?: number) {
    if (arguments.length === 1 && x instanceof Plane) {
      this._normal   = x._normal.clone();
      this._constant = x._constant;
    } else if (arguments.length === 4) {
      this._normal   = new Vector3(x as number, y, z);
      this._constant = w;
    } else if (arguments.length === 2) {
      this._normal   = (x as Vector3).clone();
      this._constant = (y as number);
    } else {
      this._normal   = new Vector3();
      this._constant = 0;
    }
  }

  private readonly _normal: Vector3;

  public get normal() {
    return this._normal;
  }

  private _constant: number;

  public get constant() {
    return this._constant;
  }

  public set constant(value: number) {
    this._constant = value;
  }

  public normalize() {
    const inverseLength = 1 / this._normal.length;
    this._normal.scale(inverseLength);
    this._constant *= inverseLength;
  }

  public distanceToVector3(point: Vector3) {
    return this._normal.dot(point) + this._constant;
  }
}
