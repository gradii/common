/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */


import { IntersectionResult } from './intersection-result';
import { Matrix4 } from './matrix4';
import { Obb3 } from './obb3';
import { Plane } from './plane';
import { Quad } from './quad';
import { Ray } from './ray';
import { Sphere } from './sphere';
import { Triangle } from './triangle';
import { Vector3 } from './vector3';

export class Aabb3 {

  // Avoid allocating these instance on every call to intersectsWithTriangle
  static _quadTriangle0: Triangle = new Triangle(); // tslint:disable-line
  static _quadTriangle1: Triangle = new Triangle(); // tslint:disable-line
  // calculate with temp value, reduce memory;
  private static _aabbCenter           = new Vector3();
  private static _aabbHalfExtents      = new Vector3();
  private static _v0: Vector3          = new Vector3();
  private static _v1: Vector3          = new Vector3();
  private static _v2: Vector3          = new Vector3();
  private static _f0: Vector3          = new Vector3();
  private static _f1: Vector3          = new Vector3();
  private static _f2: Vector3          = new Vector3();
  private static _trianglePlane: Plane = new Plane();
  private static _u0: Vector3          = new Vector3([1.0, 0.0, 0.0]);
  private static _u1: Vector3          = new Vector3([0.0, 1.0, 0.0]);
  private static _u2: Vector3          = new Vector3([0.0, 0.0, 1.0]);

  constructor(min: Vector3, max: Vector3);

  constructor();

  constructor(min?: Vector3, max?: Vector3) {
    if (arguments.length === 2) {
      this._min = min.clone();
      this._max = max.clone();
    } else {
      this._min = Vector3.zero();
      this._max = Vector3.zero();
    }
  }

  private readonly _min: Vector3;

  public get min() {
    return this._min;
  }

  private readonly _max: Vector3;

  public get max() {
    return this._max;
  }

  public get center() {
    return this._min.clone()
      .add(this._max)
      .scale(0.5);
  }

  public setCenterAndHalfExtents(center: Vector3, halfExtents: Vector3) {
    this._min
      .setFrom(center)
      .sub(halfExtents);

    this._max
      .setFrom(center)
      .add(halfExtents);

    return this;
  }

  public setSphere(sphere: Sphere) {
    this._min
      .splat(-sphere.radius)
      .add(sphere.center);
    this._max
      .splat(sphere.radius)
      .add(sphere.center);

    return this;
  }

  /// Set the AABB to enclose a [triangle].
  public setTriangle(triangle: Triangle) {
    this._min.setValues(
      Math.min(triangle._point0.x,
        Math.min(triangle._point1.x, triangle._point2.x)),
      Math.min(triangle._point0.y,
        Math.min(triangle._point1.y, triangle._point2.y)),
      Math.min(triangle._point0.z,
        Math.min(triangle._point1.z, triangle._point2.z))
    );
    this._max.setValues(
      Math.max(triangle._point0.x,
        Math.max(triangle._point1.x, triangle._point2.x)),
      Math.max(triangle._point0.y,
        Math.max(triangle._point1.y, triangle._point2.y)),
      Math.max(triangle._point0.z,
        Math.max(triangle._point1.z, triangle._point2.z))
    );

    return this;
  }

  /// Set the AABB to enclose a limited [ray] (or line segment) that is limited

  /// Set the AABB to enclose a [quad].
  public setQuad(quad: Quad) {
    this._min.setValues(
      Math.min(quad.point0.x,
        Math.min(quad.point1.x, Math.min(quad.point2.x, quad.point3.x))),
      Math.min(quad.point0.y,
        Math.min(quad.point1.y, Math.min(quad.point2.y, quad.point3.y))),
      Math.min(
        quad.point0.z,
        Math.min(
          quad.point1.z, Math.min(quad.point2.z, quad.point3.z)))
    );
    this._max.setValues(
      Math.max(quad.point0.x,
        Math.max(quad.point1.x, Math.max(quad.point2.x, quad.point3.x))),
      Math.max(quad.point0.y,
        Math.max(quad.point1.y, Math.max(quad.point2.y, quad.point3.y))),
      Math.max(
        quad.point0.z,
        Math.max(
          quad.point1.z, Math.max(quad.point2.z, quad.point3.z)))
    );

    return this;
  }

  /// Set the AABB to enclose a [obb].
  public setObb3(obb: Obb3) {
    const corner: Vector3 = Vector3.zero();

    obb.copyCorner(0, corner);
    this._min.setFrom(corner);
    this._max.setFrom(corner);

    obb.copyCorner(1, corner);
    this.hullPoint(corner);

    obb.copyCorner(2, corner);
    this.hullPoint(corner);

    obb.copyCorner(3, corner);
    this.hullPoint(corner);

    obb.copyCorner(4, corner);
    this.hullPoint(corner);

    obb.copyCorner(5, corner);
    this.hullPoint(corner);

    obb.copyCorner(6, corner);
    this.hullPoint(corner);

    obb.copyCorner(7, corner);
    this.hullPoint(corner);

    return this;
  }

  /// by [limitMin] and [limitMax].
  public setRay(ray: Ray, limitMin: number, limitMax: number) {
    ray.copyAt(this._min, limitMin);
    ray.copyAt(this._max, limitMax);

    if (this._max.x < this._min.x) {
      const temp  = this._max.x;
      this._max.x = this._min.x;
      this._min.x = temp;
    }

    if (this._max.y < this._min.y) {
      const temp  = this._max.y;
      this._max.y = this._min.y;
      this._min.y = temp;
    }

    if (this._max.z < this._min.z) {
      const temp  = this._max.z;
      this._max.z = this._min.z;
      this._min.z = temp;
    }

    return this;
  }

  /// Copy the [center] and the [halfExtends] of [this].
  public copyCenterAndHalfExtents(center: Vector3, halfExtents: Vector3) {
    center
      .setFrom(this._min)
      .add(this._max)
      .scale(0.5);
    halfExtents
      .setFrom(this._max)
      .sub(this._min)
      .scale(0.5);
  }

  public copyCenter(center: Vector3) {
    center
      .setFrom(this._min)
      .add(this._max)
      .scale(0.5);
  }

  public copyFrom(other: Aabb3) {
    this._min.setFrom(other._min);
    this._max.setFrom(other._max);

    return this;
  }

  /// Transform [this] by the transform [t].
  public transform(t: Matrix4) {
    const center: Vector3      = Vector3.zero();
    const halfExtents: Vector3 = Vector3.zero();
    this.copyCenterAndHalfExtents(center, halfExtents);
    t.transform3(center);
    t.absoluteRotate(halfExtents);

    this._min
      .setFrom(center)
      .sub(halfExtents);
    this._max
      .setFrom(center)
      .add(halfExtents);
  }

  /// Rotate [this] by the rotation matrix [t].
  public rotate(t: Matrix4) {
    const center: Vector3      = Vector3.zero();
    const halfExtents: Vector3 = Vector3.zero();
    this.copyCenterAndHalfExtents(center, halfExtents);
    t.absoluteRotate(halfExtents);

    this._min
      .setFrom(center)
      .sub(halfExtents);
    this._max
      .setFrom(center)
      .add(halfExtents);
  }

  public transformed(t: Matrix4, out: Aabb3) {
    out.copyFrom(this)
      .transform(t);

    return out;
  }

  /// Set the min and max of [this] so that [this] is a hull of [this] and

  public rotated(t: Matrix4, out: Aabb3) {
    out.copyFrom(this)
      .rotate(t);

    return out;
  }

  public getPN(planeNormal: Vector3, outP: Vector3, outN: Vector3) {
    if (planeNormal.x < 0.0) {
      outP.x = this._min.x;
      outN.x = this._max.x;
    } else {
      outP.x = this._max.x;
      outN.x = this._min.x;
    }

    if (planeNormal.y < 0.0) {
      outP.y = this._min.y;
      outN.y = this._max.y;
    } else {
      outP.y = this._max.y;
      outN.y = this._min.y;
    }

    if (planeNormal.z < 0.0) {
      outP.z = this._min.z;
      outN.z = this._max.z;
    } else {
      outP.z = this._max.z;
      outN.z = this._min.z;
    }
  }

  /// [other].
  public hull(other: Aabb3) {
    Vector3.min(this._min, other._min, this._min);
    Vector3.max(this._max, other._max, this._max);
  }

  /// Set the min and max of [this] so that [this] contains [point].
  public hullPoint(point: Vector3) {
    Vector3.min(this._min, point, this._min);
    Vector3.max(this._max, point, this._max);
  }

  /// Return if [this] contains [other].
  public containsAabb3(other: Aabb3) {
    const otherMax: Vector3 = other._max;
    const otherMin: Vector3 = other._min;

    return (this._min.x < otherMin.x) &&
      (this._min.y < otherMin.y) &&
      (this._min.z < otherMin.z) &&
      (this._max.x > otherMax.x) &&
      (this._max.y > otherMax.y) &&
      (this._max.z > otherMax.z);
  }

  /// Return if [this] contains [other].
  public containsSphere(other: Sphere) {
    const boxExtends: Vector3 = new Vector3(other.radius, other.radius, other.radius);
    const sphereBox           = new Aabb3(other.center, boxExtends);

    return this.containsAabb3(sphereBox);
  }

  /// Return if [this] contains [other].
  public containsVector3(other: Vector3) {
    return (this._min.x < other.x) &&
      (this._min.y < other.y) &&
      (this._min.z < other.z) &&
      (this._max.x > other.x) &&
      (this._max.y > other.y) &&
      (this._max.z > other.z);
  }

  /// Return if [this] contains [other].
  public containsTriangle(other: Triangle) {
    return this.containsVector3(other._point0) &&
      this.containsVector3(other._point1) &&
      this.containsVector3(other._point2);
  }

  public intersectsWithAabb3(other: Aabb3) {
    const otherMax = other._max;
    const otherMin = other._min;

    return (this._min.x <= otherMax.x) &&
      (this._min.y <= otherMax.y) &&
      (this._min.z <= otherMax.z) &&
      (this._max.x >= otherMin.x) &&
      (this._max.y >= otherMin.y) &&
      (this._max.z >= otherMin.z);
  }

  public intersectsWithSphere(other: Sphere) {
    const center = other.center;
    const radius = other.radius;
    let d        = 0.0;
    let e        = 0.0;

    for (let i = 0; i < 3; ++i) {
      if ((e = center.at(i) - this._min.at(i)) < 0.0) {
        if (e < -radius) {
          return false;
        }

        d = d + e * e;
      } else {
        if ((e = center.at(i) - this._max.at(i)) > 0.0) {
          if (e > radius) {
            return false;
          }

          d = d + e * e;
        }
      }
    }

    return d <= radius * radius;
  }

  public intersectsWithVector3(other: Vector3) {
    return (this._min.x <= other.x) &&
      (this._min.y <= other.y) &&
      (this._min.z <= other.z) &&
      (this._max.x >= other.x) &&
      (this._max.y >= other.y) &&
      (this._max.z >= other.z);
  }

  public intersectsWithTriangle(other: Triangle, result: IntersectionResult, epsilon = 1e-3) {
    let p0, p1, p2, r, len;
    let a;
    const _aabbCenter      = Aabb3._aabbCenter,
          _aabbHalfExtents = Aabb3._aabbHalfExtents,
          _v0              = Aabb3._v0,
          _v1              = Aabb3._v1,
          _v2              = Aabb3._v2,
          _f0              = Aabb3._f0,
          _f1              = Aabb3._f1,
          _f2              = Aabb3._f2,
          _trianglePlane   = Aabb3._trianglePlane,
          _u0              = Aabb3._u0,
          _u1              = Aabb3._u1,
          _u2              = Aabb3._u2;

    // This line isn't required if we are using center and half extents to
    // define a aabb
    this.copyCenterAndHalfExtents(Aabb3._aabbCenter, Aabb3._aabbHalfExtents);

    // Translate triangle as conceptually moving AABB to origin
    _v0
      .setFrom(other.point0)
      .sub(_aabbCenter);
    _v1
      .setFrom(other.point1)
      .sub(_aabbCenter);
    _v2
      .setFrom(other.point2)
      .sub(_aabbCenter);

    // Translate triangle as conceptually moving AABB to origin
    _f0
      .setFrom(_v1)
      .sub(_v0);
    _f1
      .setFrom(_v2)
      .sub(_v1);
    _f2
      .setFrom(_v0)
      .sub(_v2);

    // Test axes a00..a22 (category 3)
    // Test axis a00
    len = _f0.y * _f0.y + _f0.z * _f0.z;
    if (len > epsilon) {
      // Ignore tests on degenerate axes.
      p0 = _v0.z * _f0.y - _v0.y * _f0.z;
      p2 = _v2.z * _f0.y - _v2.y * _f0.z;
      r  = _aabbHalfExtents.y * Math.abs(_f0.z) + _aabbHalfExtents.z * Math.abs(_f0.y);
      if (Math.max(-Math.max(p0, p2), Math.min(p0, p2)) > r + epsilon) {
        return false; // Axis is a separating axis
      }

      a = Math.min(p0, p2) - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        _u0.crossInto(_f0, result.axis);
      }
    }

    // Test axis a01
    len = _f1.y * _f1.y + _f1.z * _f1.z;
    if (len > epsilon) {
      // Ignore tests on degenerate axes.
      p0 = _v0.z * _f1.y - _v0.y * _f1.z;
      p1 = _v1.z * _f1.y - _v1.y * _f1.z;
      r  = _aabbHalfExtents.y * Math.abs(_f1.z) + _aabbHalfExtents.z * Math.abs(_f1.y);
      if (Math.max(-Math.max(p0, p1), Math.min(p0, p1)) > r + epsilon) {
        return false; // Axis is a separating axis
      }

      a = Math.min(p0, p1) - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        _u0.crossInto(_f1, result.axis);
      }
    }

    // Test axis a02
    len = _f2.y * _f2.y + _f2.z * _f2.z;
    if (len > epsilon) {
      // Ignore tests on degenerate axes.
      p0 = _v0.z * _f2.y - _v0.y * _f2.z;
      p1 = _v1.z * _f2.y - _v1.y * _f2.z;
      r  = _aabbHalfExtents.y * Math.abs(_f2.z) + _aabbHalfExtents.z * Math.abs(_f2.y);
      if (Math.max(-Math.max(p0, p1), Math.min(p0, p1)) > r + epsilon) {
        return false; // Axis is a separating axis
      }

      a = Math.min(p0, p1) - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        _u0.crossInto(_f2, result.axis);
      }
    }

    // Test axis a10
    len = _f0.x * _f0.x + _f0.z * _f0.z;
    if (len > epsilon) {
      // Ignore tests on degenerate axes.
      p0 = _v0.x * _f0.z - _v0.z * _f0.x;
      p2 = _v2.x * _f0.z - _v2.z * _f0.x;
      r  = _aabbHalfExtents.x * Math.abs(_f0.z) + _aabbHalfExtents.z * Math.abs(_f0.x);
      if (Math.max(-Math.max(p0, p2), Math.min(p0, p2)) > r + epsilon) {
        return false; // Axis is a separating axis
      }

      a = Math.min(p0, p2) - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        _u1.crossInto(_f0, result.axis);
      }
    }

    // Test axis a11
    len = _f1.x * _f1.x + _f1.z * _f1.z;
    if (len > epsilon) {
      // Ignore tests on degenerate axes.
      p0 = _v0.x * _f1.z - _v0.z * _f1.x;
      p1 = _v1.x * _f1.z - _v1.z * _f1.x;
      r  = _aabbHalfExtents.x * Math.abs(_f1.z) + _aabbHalfExtents.z * Math.abs(_f1.x);
      if (Math.max(-Math.max(p0, p1), Math.min(p0, p1)) > r + epsilon) {
        return false; // Axis is a separating axis
      }

      a = Math.min(p0, p1) - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        _u1.crossInto(_f1, result.axis);
      }
    }

    // Test axis a12
    len = _f2.x * _f2.x + _f2.z * _f2.z;
    if (len > epsilon) {
      // Ignore tests on degenerate axes.
      p0 = _v0.x * _f2.z - _v0.z * _f2.x;
      p1 = _v1.x * _f2.z - _v1.z * _f2.x;
      r  = _aabbHalfExtents.x * Math.abs(_f2.z) + _aabbHalfExtents.z * Math.abs(_f2.x);
      if (Math.max(-Math.max(p0, p1), Math.min(p0, p1)) > r + epsilon) {
        return false; // Axis is a separating axis
      }

      a = Math.min(p0, p1) - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        _u1.crossInto(_f2, result.axis);
      }
    }

    // Test axis a20
    len = _f0.x * _f0.x + _f0.y * _f0.y;
    if (len > epsilon) {
      // Ignore tests on degenerate axes.
      p0 = _v0.y * _f0.x - _v0.x * _f0.y;
      p2 = _v2.y * _f0.x - _v2.x * _f0.y;
      r  = _aabbHalfExtents.x * Math.abs(_f0.y) + _aabbHalfExtents.y * Math.abs(_f0.x);
      if (Math.max(-Math.max(p0, p2), Math.min(p0, p2)) > r + epsilon) {
        return false; // Axis is a separating axis
      }

      a = Math.min(p0, p2) - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        _u2.crossInto(_f0, result.axis);
      }
    }

    // Test axis a21
    len = _f1.x * _f1.x + _f1.y * _f1.y;
    if (len > epsilon) {
      // Ignore tests on degenerate axes.
      p0 = _v0.y * _f1.x - _v0.x * _f1.y;
      p1 = _v1.y * _f1.x - _v1.x * _f1.y;
      r  = _aabbHalfExtents.x * Math.abs(_f1.y) + _aabbHalfExtents.y * Math.abs(_f1.x);
      if (Math.max(-Math.max(p0, p1), Math.min(p0, p1)) > r + epsilon) {
        return false; // Axis is a separating axis
      }

      a = Math.min(p0, p1) - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        _u2.crossInto(_f1, result.axis);
      }
    }

    // Test axis a22
    len = _f2.x * _f2.x + _f2.y * _f2.y;
    if (len > epsilon) {
      // Ignore tests on degenerate axes.
      p0 = _v0.y * _f2.x - _v0.x * _f2.y;
      p1 = _v1.y * _f2.x - _v1.x * _f2.y;
      r  = _aabbHalfExtents.x * Math.abs(_f2.y) + _aabbHalfExtents.y * Math.abs(_f2.x);
      if (Math.max(-Math.max(p0, p1), Math.min(p0, p1)) > r + epsilon) {
        return false; // Axis is a separating axis
      }

      a = Math.min(p0, p1) - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        _u2.crossInto(_f2, result.axis);
      }
    }

    // Test the three axes corresponding to the face normals of AABB b (category 1). // Exit if...
    // ... [-e0, e0] and [min(v0.x,v1.x,v2.x), max(v0.x,v1.x,v2.x)] do not overlap
    if (Math.max(_v0.x, Math.max(_v1.x, _v2.x)) < -_aabbHalfExtents.x ||
      Math.min(_v0.x, Math.min(_v1.x, _v2.x)) > _aabbHalfExtents.x) {
      return false;
    }
    a = Math.min(_v0.x, Math.min(_v1.x, _v2.x)) - _aabbHalfExtents.x;
    if (result != null && (result.depth == null || result.depth < a)) {
      result.depth = a;
      result.axis.setFrom(_u0);
    }
    // ... [-e1, e1] and [min(v0.y,v1.y,v2.y), max(v0.y,v1.y,v2.y)] do not overlap
    if (Math.max(_v0.y, Math.max(_v1.y, _v2.y)) < -_aabbHalfExtents.y ||
      Math.min(_v0.y, Math.min(_v1.y, _v2.y)) > _aabbHalfExtents.y) {
      return false;
    }
    a = Math.min(_v0.y, Math.min(_v1.y, _v2.y)) - _aabbHalfExtents.y;
    if (result != null && (result.depth == null || result.depth < a)) {
      result.depth = a;
      result.axis.setFrom(_u1);
    }
    // ... [-e2, e2] and [min(v0.z,v1.z,v2.z), max(v0.z,v1.z,v2.z)] do not overlap
    if (Math.max(_v0.z, Math.max(_v1.z, _v2.z)) < -_aabbHalfExtents.z ||
      Math.min(_v0.z, Math.min(_v1.z, _v2.z)) > _aabbHalfExtents.z) {
      return false;
    }
    a = Math.min(_v0.z, Math.min(_v1.z, _v2.z)) - _aabbHalfExtents.z;
    if (result != null && (result.depth == null || result.depth < a)) {
      result.depth = a;
      result.axis.setFrom(_u2);
    }

    // It seems like that wee need to move the edges before creating the
    // plane
    _v0.add(_aabbCenter);

    // Test separating axis corresponding to triangle face normal (category 2)
    _f0.crossInto(_f1, _trianglePlane.normal);
    _trianglePlane.constant = _trianglePlane.normal.dot(_v0);
    return this.intersectsWithPlane(_trianglePlane, result);
  }

  public intersectsWithPlane(other: Plane, result: IntersectionResult) {
    // This line is not necessary with a (center, extents) AABB representation
    this.copyCenterAndHalfExtents(Aabb3._aabbCenter, Aabb3._aabbHalfExtents);

    // Compute the projection interval radius of b onto L(t) = b.c + t * p.n
    const r = Aabb3._aabbHalfExtents.x * Math.abs(other.normal.x) +
      Aabb3._aabbHalfExtents.y * Math.abs(other.normal.y) +
      Aabb3._aabbHalfExtents.z * Math.abs(other.normal.z);
    // Compute distance of box center from plane
    const s = other.normal.dot(Aabb3._aabbCenter) - other.constant;
    // Intersection occurs when distance s falls within [-r,+r] interval
    if (Math.abs(s) <= r) {
      const a = s - r;
      if (result != null && (result.depth == null || result.depth < a)) {
        result.depth = a;
        result.axis.setFrom(other.normal);
      }
      return true;
    }

    return false;
  }

  /// Return if [this] intersects with [other].
  /// [epsilon] allows the caller to specify a custum eplsilon value that should
  /// be used for the test. If [result] is specified and an intersection is
  /// found, result is modified to contain more details about the type of

  /// intersection.
  public intersectsWithQuad(other: Quad, result: IntersectionResult) {
    other.copyTriangles(Aabb3._quadTriangle0, Aabb3._quadTriangle1);

    return this.intersectsWithTriangle(Aabb3._quadTriangle0, result) ||
      this.intersectsWithTriangle(Aabb3._quadTriangle1, result);
  }
}
