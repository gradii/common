/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Vector3 } from './vector3';

export class Sphere {
  private _center: Vector3;

  public get center() {
    return this._center;
  }

  private _radius: number;

  public get radius() {
    return this._radius;
  }

  public set radius(value) {
    this._radius = value;
  }

  public copyFrom(other: Sphere) {
    this._center = other._center;
    this._radius = other._radius;

    return this;
  }

  public containsVector3(other: Vector3): boolean {
    return other.distanceToSquared(this._center) < this._radius * this._radius;
  }

  public intersectsWithVector3(other: Vector3): boolean {
    return other.distanceToSquared(this._center) <= this._radius * this._radius;
  }

  public intersectsWithSphere(other: Sphere): boolean {
    const radiusSum = this._radius + other._radius;

    return other._center.distanceToSquared(this._center) <= (radiusSum * radiusSum);
  }

}
