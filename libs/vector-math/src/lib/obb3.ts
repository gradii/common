/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */


import { Aabb3 } from './aabb3';
import { clamp, EPSILON } from './common';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';
import { Triangle } from './triangle';
import { Vector3 } from './vector3';

export class Obb3 {
  private static _r: Matrix3          = new Matrix3(); // tslint:disable-line
  private static _absR: Matrix3       = new Matrix3(); // tslint:disable-line
  private static _t: Vector3          = new Vector3(); // tslint:disable-line
  private static _triangle: Triangle  = new Triangle(); //tslint:disable-line
  private static _aabb3: Aabb3        = new Aabb3(); //tslint:disable-line
  private static _zeroVector: Vector3 = Vector3.zero(); //tslint:disable-line
  private static _vector: Vector3     = new Vector3(); //tslint:disable-line

  constructor();

  constructor(center: Vector3, halfExtents: Vector3,
              axis0: Vector3, axis1: Vector3, axis2: Vector3);

  constructor(center?: Vector3, halfExtents?: Vector3,
              axis0?: Vector3, axis1?: Vector3, axis2?: Vector3) {
    if (arguments.length === 5) {
      this._center      = center;
      this._halfExtents = halfExtents;
      this._axis0       = axis0;
      this._axis1       = axis1;
      this._axis2       = axis2;
    } else {
      this._center      = Vector3.zero();
      this._halfExtents = Vector3.zero();
      this._axis0       = new Vector3(1, 0, 0);
      this._axis1       = new Vector3(0, 1, 0);
      this._axis2       = new Vector3(0, 0, 1);
    }
  }

  private _center: Vector3;

  public get center() {
    return this._center;
  }

  private _halfExtents: Vector3;

  public get halfExtents() {
    return this._halfExtents;
  }

  private _axis0: Vector3;

  public get axis0() {
    return this._axis0;
  }

  private _axis1: Vector3;

  public get axis1() {
    return this._axis1;
  }

  private _axis2: Vector3;

  public get axis2() {
    return this._axis2;
  }

  public copyFrom(other: Obb3) {
    this._center.setFrom(other._center);
    this._halfExtents.setFrom(other._halfExtents);
    this._axis0.setFrom(other._axis0);
    this._axis1.setFrom(other._axis1);
    this._axis2.setFrom(other._axis2);

    return this;
  }

  public copy(other?: Obb3) {
    if (!other) {
      return new Obb3(this._center, this._halfExtents, this._axis0, this._axis1, this._axis2);
    }

    other._center.setFrom(this._center);
    other._halfExtents.setFrom(this._halfExtents);
    other._axis0.setFrom(this._axis0);
    other._axis1.setFrom(this._axis1);
    other._axis2.setFrom(this._axis2);

    return other;
  }

  public resetRotation() {
    this._axis0.setValues(1.0, 0.0, 0.0);
    this._axis1.setValues(0.0, 1.0, 0.0);
    this._axis2.setValues(0.0, 0.0, 1.0);

    return this;
  }

  public translate(offset: Vector3) {
    this._center.add(offset);

    return this;
  }

  public rotate(m: Matrix3): this {
    m.transformVector3(this._axis0.scale(this._halfExtents.x)).normalize();
    m.transformVector3(this._axis1.scale(this._halfExtents.y)).normalize();
    m.transformVector3(this._axis2.scale(this._halfExtents.z)).normalize();

    this._halfExtents.setValues(
      this._axis0.length,
      this._axis1.length,
      this._axis2.length
    );

    return this;
  }

  public transform(m: Matrix4): this {
    m.transform3(this._center);
    m.rotate3(this._axis0.scale(this._halfExtents.x)).normalize();
    m.rotate3(this._axis1.scale(this._halfExtents.y)).normalize();
    m.rotate3(this._axis2.scale(this._halfExtents.z)).normalize();

    this._halfExtents.setValues(
      this._axis0.length,
      this._axis1.length,
      this._axis2.length
    );

    return this;
  }

  public copyCorner(cornerIndex: number, corner: Vector3): void {
    corner.setFrom(this._center);

    switch (cornerIndex) {
      case 0:
        corner.addScaled(this._axis0, -this._halfExtents.x);
        corner.addScaled(this._axis1, -this._halfExtents.y);
        corner.addScaled(this._axis2, -this._halfExtents.z);
        break;
      case 1:
        corner.addScaled(this._axis0, -this._halfExtents.x);
        corner.addScaled(this._axis1, -this._halfExtents.y);
        corner.addScaled(this._axis2, this._halfExtents.z);
        break;
      case 2:
        corner.addScaled(this._axis0, -this._halfExtents.x);
        corner.addScaled(this._axis1, this._halfExtents.y);
        corner.addScaled(this._axis2, -this._halfExtents.z);
        break;
      case 3:
        corner.addScaled(this._axis0, -this._halfExtents.x);
        corner.addScaled(this._axis1, this._halfExtents.y);
        corner.addScaled(this._axis2, this._halfExtents.z);
        break;
      case 4:
        corner.addScaled(this._axis0, this._halfExtents.x);
        corner.addScaled(this._axis1, -this._halfExtents.y);
        corner.addScaled(this._axis2, -this._halfExtents.z);
        break;
      case 5:
        corner.addScaled(this._axis0, this._halfExtents.x);
        corner.addScaled(this._axis1, -this._halfExtents.y);
        corner.addScaled(this._axis2, this._halfExtents.z);
        break;
      case 6:
        corner.addScaled(this._axis0, this._halfExtents.x);
        corner.addScaled(this._axis1, this._halfExtents.y);
        corner.addScaled(this._axis2, -this._halfExtents.z);
        break;
      case 7:
        corner.addScaled(this._axis0, this._halfExtents.x);
        corner.addScaled(this._axis1, this._halfExtents.y);
        corner.addScaled(this._axis2, this._halfExtents.z);
        break;
    }
  }

  public closestPointTo(p: Vector3, q: Vector3): this {
    const d: Vector3 = p.clone().sub(this._center);
    q.setFrom(this._center);

    let dist;
    dist = Vector3.dot(d, this._axis0);
    dist = clamp(dist, -this._halfExtents.x, this._halfExtents.x);
    q.addScaled(this._axis0, dist);

    dist = Vector3.dot(d, this._axis1);
    dist = clamp(dist, -this._halfExtents.y, this._halfExtents.y);
    q.addScaled(this._axis1, dist);

    dist = Vector3.dot(d, this._axis2);
    dist = clamp(dist, -this._halfExtents.z, this._halfExtents.z);
    q.addScaled(this._axis2, dist);

    return this;
  }

  // public intersectsWithTriangle(other: Triangle, result: IntersectionResult) {
  //   Obb3._triangle.copyFrom(other);
  //
  //   Obb3._triangle.point0
  //     .sub(this._center)
  //     .setValues(
  //       Obb3._triangle.point0.dot(this._axis0),
  //       Obb3._triangle.point0.dot(this._axis1),
  //       Obb3._triangle.point0.dot(this._axis2)
  //     );
  //
  //   Obb3._triangle.point1
  //     .sub(this._center)
  //     .setValues(
  //       Obb3._triangle.point1.dot(this._axis0),
  //       Obb3._triangle.point1.dot(this._axis1),
  //       Obb3._triangle.point1.dot(this._axis2)
  //     );
  //
  //   Obb3._triangle.point2
  //     .sub(this._center)
  //     .setValues(
  //       Obb3._triangle.point2.dot(this._axis0),
  //       Obb3._triangle.point2.dot(this._axis1),
  //       Obb3._triangle.point2.dot(this._axis2)
  //     );
  //
  //   Obb3._aabb3.setCenterAndHalfExtents(Obb3._zeroVector, this._halfExtents);
  //
  //   return Obb3._aabb3.intersectsWithTriangle(Obb3._triangle, result);
  // }

  public intersectsWithObb3(other: Obb3, epsilon = EPSILON) {
    Obb3._r.setValues(
      this._axis0.dot(other._axis0), this._axis0.dot(other._axis1), this._axis0.dot(other._axis2),
      this._axis1.dot(other._axis0), this._axis1.dot(other._axis1), this._axis1.dot(other._axis2),
      this._axis2.dot(other._axis0), this._axis2.dot(other._axis1), this._axis2.dot(other._axis2)
    );

    Obb3._t
      .setFrom(other._center)
      .sub(this._center);

    Obb3._t
      .setValues(Obb3._t.dot(this._axis0), Obb3._t.dot(this._axis1), Obb3._t.dot(this._axis2));

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        Obb3._absR.setEntry(i, j, Math.abs(Obb3._r.entry(i, j)) + epsilon);
      }
    }

    let ra, rb;

    // Test axes L = A0, L = A1, L = A2
    for (let i = 0; i < 3; i++) {
      ra = this._halfExtents.at(i);
      rb = other._halfExtents.at(0) * Obb3._absR.entry(i, 0) +
        other._halfExtents.at(1) * Obb3._absR.entry(i, 1) +
        other._halfExtents.at(2) * Obb3._absR.entry(i, 2);

      if (Math.abs(Obb3._t.at(i)) > ra + rb) {
        return false;
      }
    }

    // Test axes L = B0, L = B1, L = B2
    for (let i = 0; i < 3; i++) {
      ra = this._halfExtents.at(0) * Obb3._absR.entry(0, i) +
        this._halfExtents.at(1) * Obb3._absR.entry(1, i) +
        this._halfExtents.at(2) * Obb3._absR.entry(2, i);
      rb = other._halfExtents.at(i);

      if (Math.abs(Obb3._t.at(0) * Obb3._r.entry(0, i) +
          Obb3._t.at(1) * Obb3._r.entry(1, i) +
          Obb3._t.at(2) * Obb3._r.entry(2, i)) >
        ra + rb) {
        return false;
      }
    }

    // Test axis L = A0 x B0
    ra = this._halfExtents.at(1) * Obb3._absR.entry(2, 0) +
      this._halfExtents.at(2) * Obb3._absR.entry(1, 0);
    rb = other._halfExtents.at(1) * Obb3._absR.entry(0, 2) +
      other._halfExtents.at(2) * Obb3._absR.entry(0, 1);
    if (Math.abs(
      Obb3._t.at(2) * Obb3._r.entry(1, 0) - Obb3._t.at(1) * Obb3._r.entry(2, 0)) > ra + rb) {
      return false;
    }

    // Test axis L = A0 x B1
    ra = this._halfExtents.at(1) * Obb3._absR.entry(2, 1) +
      this._halfExtents.at(2) * Obb3._absR.entry(1, 1);
    rb = other._halfExtents.at(0) * Obb3._absR.entry(0, 2) +
      other._halfExtents.at(2) * Obb3._absR.entry(0, 0);
    if (Math.abs(
      Obb3._t.at(2) * Obb3._r.entry(1, 1) - Obb3._t.at(1) * Obb3._r.entry(2, 1)) > ra + rb) {
      return false;
    }

    // Test axis L = A0 x B2
    ra = this._halfExtents.at(1) * Obb3._absR.entry(2, 2) +
      this._halfExtents.at(2) * Obb3._absR.entry(1, 2);
    rb = other._halfExtents.at(0) * Obb3._absR.entry(0, 1) +
      other._halfExtents.at(1) * Obb3._absR.entry(0, 0);
    if (Math.abs(
      Obb3._t.at(2) * Obb3._r.entry(1, 2) - Obb3._t.at(1) * Obb3._r.entry(2, 2)) > ra + rb) {
      return false;
    }

    // Test axis L = A1 x B0
    ra = this._halfExtents.at(0) * Obb3._absR.entry(2, 0) +
      this._halfExtents.at(2) * Obb3._absR.entry(0, 0);
    rb = other._halfExtents.at(1) * Obb3._absR.entry(1, 2) +
      other._halfExtents.at(2) * Obb3._absR.entry(1, 1);
    if (Math.abs(
      Obb3._t.at(0) * Obb3._r.entry(2, 0) - Obb3._t.at(2) * Obb3._r.entry(0, 0)) > ra + rb) {
      return false;
    }

    // Test axis L = A1 x B1
    ra = this._halfExtents.at(0) * Obb3._absR.entry(2, 1) +
      this._halfExtents.at(2) * Obb3._absR.entry(0, 1);
    rb = other._halfExtents.at(0) * Obb3._absR.entry(1, 2) +
      other._halfExtents.at(2) * Obb3._absR.entry(1, 0);
    if (Math.abs(
      Obb3._t.at(0) * Obb3._r.entry(2, 1) - Obb3._t.at(2) * Obb3._r.entry(0, 1)) > ra + rb) {
      return false;
    }

    // Test axis L = A1 x B2
    ra = this._halfExtents.at(0) * Obb3._absR.entry(2, 2) +
      this._halfExtents.at(2) * Obb3._absR.entry(0, 2);
    rb = other._halfExtents.at(0) * Obb3._absR.entry(1, 1) +
      other._halfExtents.at(1) * Obb3._absR.entry(1, 0);
    if (Math.abs(
      Obb3._t.at(0) * Obb3._r.entry(2, 2) - Obb3._t.at(2) * Obb3._r.entry(0, 2)) > ra + rb) {
      return false;
    }

    // Test axis L = A2 x B0
    ra = this._halfExtents.at(0) * Obb3._absR.entry(1, 0) +
      this._halfExtents.at(1) * Obb3._absR.entry(0, 0);
    rb = other._halfExtents.at(1) * Obb3._absR.entry(2, 2) +
      other._halfExtents.at(2) * Obb3._absR.entry(2, 1);
    if (Math.abs(
      Obb3._t.at(1) * Obb3._r.entry(0, 0) - Obb3._t.at(0) * Obb3._r.entry(1, 0)) > ra + rb) {
      return false;
    }

    // Test axis L = A2 x B1
    ra = this._halfExtents.at(0) * Obb3._absR.entry(1, 1) +
      this._halfExtents.at(1) * Obb3._absR.entry(0, 1);
    rb = other._halfExtents.at(0) * Obb3._absR.entry(2, 2) +
      other._halfExtents.at(2) * Obb3._absR.entry(2, 0);
    if (Math.abs(
      Obb3._t.at(1) * Obb3._r.entry(0, 1) - Obb3._t.at(0) * Obb3._r.entry(1, 1)) > ra + rb) {
      return false;
    }

    // Test axis L = A2 x B2
    ra = this._halfExtents.at(0) * Obb3._absR.entry(1, 2) +
      this._halfExtents.at(1) * Obb3._absR.entry(0, 2);
    rb = other._halfExtents.at(0) * Obb3._absR.entry(2, 1) +
      other._halfExtents.at(1) * Obb3._absR.entry(2, 0);
    if (Math.abs(
      Obb3._t.at(1) * Obb3._r.entry(0, 2) - Obb3._t.at(0) * Obb3._r.entry(1, 2)) > ra + rb) {
      return false;
    }

    // Since no separating axis is found, the OBBs must be intersecting
    return true;

  }

  public intersectsWithVector3(other: Vector3) {
    Obb3._vector.setFrom(other)
      .sub(this._center)
      .setValues(Obb3._vector.dot(this._axis0), Obb3._vector.dot(this._axis1),
        Obb3._vector.dot(this._axis2));

    Obb3._aabb3.setCenterAndHalfExtents(Obb3._zeroVector, this._halfExtents);

    return Obb3._aabb3.intersectsWithVector3(Obb3._vector);
  }

  // private static _quadTriangle0: Triangle = new Triangle();
  // private static _quadTriangle1: Triangle = new Triangle();
  //
  // public intersectsWithQuad(other: Quad, result: IntersectionResult) {
  //   other.copyTriangles(_quadTriangle0, _quadTriangle1);
  //
  //   return this.intersectsWithTriangle(_quadTriangle0, result: result) ||
  //   this.intersectsWithTriangle(_quadTriangle1, result: result);
  // }

}
