/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Matrix4 } from './matrix4';
import { Vector3 } from './vector3';

export class Triangle {
  constructor(other?: Triangle)

  constructor(p0: Vector3, p1: Vector3, p2: Vector3);

  constructor(p0: Vector3 | Triangle, p1?: Vector3, p2?: Vector3) {
    if (arguments.length === 3) {
      this._point0 = (p0 as Vector3).clone();
      this._point1 = (p1 as Vector3).clone();
      this._point2 = (p2 as Vector3).clone();
    } else if (arguments.length === 1) {
      this._point0 = (p0 as Triangle).point0;
      this._point1 = (p0 as Triangle).point1;
      this._point2 = (p0 as Triangle).point2;
    } else {
      this._point0 = Vector3.zero();
      this._point1 = Vector3.zero();
      this._point2 = Vector3.zero();
    }
  }

  public _point0: Vector3;

  public get point0() {
    return this._point0;
  }

  public _point1: Vector3;

  public get point1() {
    return this._point1;
  }

  public _point2: Vector3;

  public get point2() {
    return this._point2;
  }

  public copyNormalInto(normal: Vector3) {
    const v0: Vector3 = this._point0.clone().sub(this._point1);
    normal
      .setFrom(this._point2)
      .sub(this._point1)
      .cross(v0)
      .normalize();

    return normal;
  }

  public transform(t: Matrix4) {
    t.transform3(this._point0);
    t.transform3(this._point1);
    t.transform3(this._point2);

    return this;
  }

  public translate(offset: Vector3) {
    this._point0.add(offset);
    this._point1.add(offset);
    this._point2.add(offset);

    return this;
  }
}
