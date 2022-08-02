/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Matrix3 } from './matrix3';
import { Vector2 } from './vector2';

export class Aabb2 {

  constructor(min: Vector2, max: Vector2);

  constructor();

  constructor(min?: Vector2, max?: Vector2) {
    if (arguments.length === 2) {
      this._min = min;
      this._max = max;
    } else {
      this._min = new Vector2();
      this._max = new Vector2();
    }
  }

  private readonly _min: Vector2;

  public get min() {
    return this._min;
  }

  private readonly _max: Vector2;

  public get max() {
    return this._max;
  }

  public static minMax(min: Vector2, max: Vector2) {
    return new Aabb2(min, max);
  }

  public setCenterAndHalfExtents(center: Vector2, halfExtents: Vector2) {
    this._min
      .setFrom(center)
      .subtract(halfExtents);

    this._max
      .setFrom(center)
      .subtract(halfExtents);
  }

  public copyCenterAndHalfExtents(center: Vector2, halfExtents: Vector2) {
    center
      .setFrom(this._min)
      .add(this._max)
      .scale(0.5);

    halfExtents
      .setFrom(this._max)
      .sub(this._min)
      .scale(0.5);
  }

  public copy(out?: Aabb2) {
    if (!out) {
      out = new Aabb2();
    }
    out.copyFrom(this);
    return out;
  }

  public copyFrom(other: Aabb2) {
    this._min.setFrom(other._min);
    this._max.setFrom(other._max);

    return this;
  }

  public transform(m: Matrix3) {
    const center      = new Vector2();
    const halfExtents = new Vector2();
    this.copyCenterAndHalfExtents(center, halfExtents);
    m.transformVector2(center);
    m.absoluteRotate2(halfExtents);

    this._min
      .setFrom(center)
      .sub(halfExtents);
    this._max
      .setFrom(center)
      .add(halfExtents);

    return this;
  }

  public transformed(m: Matrix3, out: Aabb2) {
    if (!out) {
      out = new Aabb2();
    }
    out.copyFrom(this)
      .transform(m);

    return out;
  }

  public rotate(m: Matrix3) {
    const center      = new Vector2();
    const halfExtents = new Vector2();

    this.copyCenterAndHalfExtents(center, halfExtents);
    m.absoluteRotate2(halfExtents);
    this._min
      .setFrom(center)
      .sub(halfExtents);
    this._max
      .setFrom(center)
      .add(halfExtents);

    return this;
  }

  public rotated(m: Matrix3) {
    return this.clone()
      .rotate(m);
  }

  public hull(other: Aabb2) {
    Vector2.min(this._min, other._min, this._min);
    Vector2.max(this._max, other._max, this._max);
  }

  public hullPoint(point: Vector2) {
    Vector2.min(this._min, point, this._min);
    Vector2.max(this._max, point, this._max);
  }

  public containsAabb2(other: Aabb2): boolean {
    const otherMin = other._min;
    const otherMax = other._max;

    return (this._min.x < otherMin.x) &&
      (this._min.y < otherMin.y) &&
      (this._max.x > otherMax.x) &&
      (this._max.y > otherMax.y);
  }

  public containsVector2(other: Vector2): boolean {
    return (this._min.x < other.x) &&
      (this._min.y < other.y) &&
      (this._max.x > other.x) &&
      (this._max.y > other.y);
  }

  public intersectsWithAabb2(other: Aabb2): boolean {
    const otherMin = other._min;
    const otherMax = other._max;

    return (this._min.x <= otherMax.x) &&
      (this._min.y <= otherMax.y) &&
      (this._max.x >= otherMin.x) &&
      (this._max.y >= otherMin.y);
  }

  public intersectsWithVector2(other: Vector2): boolean {
    return (this._min.x <= other.x) &&
      (this._min.y <= other.y) &&
      (this._max.x >= other.x) &&
      (this._max.y >= other.y);
  }

  public clone(): Aabb2 {
    return this.copy();
  }
}
