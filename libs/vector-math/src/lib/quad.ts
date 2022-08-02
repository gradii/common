/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Matrix4 } from './matrix4';
import { Triangle } from './triangle';
import { Vector3 } from './vector3';

export class Quad {
  constructor(
    private _point0: Vector3,
    private _point1: Vector3,
    private _point2: Vector3,
    private _point3: Vector3
  ) {
  }

  public get point0() {
    return this._point0;
  }

  public get point1() {
    return this._point1;
  }

  public get point2() {
    return this._point2;
  }

  public get point3() {
    return this._point3;
  }

  public static copy(other: Quad) {
    return new Quad(
      other._point0,
      other._point1,
      other._point2,
      other._point3
    );
  }

  public static points(point0: Vector3, point1: Vector3, point2: Vector3, point3: Vector3) {
    return new Quad(
      point0.clone(),
      point1.clone(),
      point2.clone(),
      point3.clone()
    );
  }

  public copyFrom(other: Quad) {
    this._point0.setFrom(other._point0);
    this._point1.setFrom(other._point1);
    this._point2.setFrom(other._point2);
    this._point3.setFrom(other._point3);

    return this;
  }

  public copyNormalInto(normal: Vector3) {
    const v0: Vector3 = this._point0.clone().sub(this._point1);
    normal
      .setFrom(this._point2)
      .sub(this._point1)
      .cross(v0)
      .normalize();
  }

  /// Copies the two triangles that define [this].
  public copyTriangles(triangle0: Triangle, triangle1: Triangle) {
    triangle0._point0.setFrom(this._point0);
    triangle0._point1.setFrom(this._point1);
    triangle0._point2.setFrom(this._point2);
    triangle1._point0.setFrom(this._point0);
    triangle1._point1.setFrom(this._point3);
    triangle1._point2.setFrom(this._point2);
  }

  /// Transform [this] by the transform [t].
  public transform(t: Matrix4) {
    t.transform3(this._point0);
    t.transform3(this._point1);
    t.transform3(this._point2);
    t.transform3(this._point3);

    return this;
  }

  /// Translate [this] by [offset].
  public translate(offset: Vector3) {
    this._point0.add(offset);
    this._point1.add(offset);
    this._point2.add(offset);
    this._point3.add(offset);

    return this;
  }
}
