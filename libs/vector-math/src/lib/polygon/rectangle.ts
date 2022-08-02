/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Vector2 } from '../vector2';


export class Rectangle {

  constructor(
    protected _point0: Vector2,
    protected _point1: Vector2,
    protected _point2: Vector2,
    protected _point3: Vector2,
  ) {
  }

  static createFromBounds(x: number, y: number, width: number, height: number): Rectangle {
    return new Rectangle(
      new Vector2(x, y), new Vector2(x + width, y),
      new Vector2(x + width, y + height), new Vector2(x, y + height)
    );
  }

  updateDimensions(x: number, y: number, width: number, height: number) {
    const rectangle = Rectangle.createFromBounds(x, y, width, height);
    this._point0    = rectangle._point0;
    this._point1    = rectangle._point1;
    this._point2    = rectangle._point2;
    this._point3    = rectangle._point3;

    return this;
  }

  getPoints() {
    return [
      this._point0,
      this._point1,
      this._point2,
      this._point3,
    ];
  }

  setPoints(points: Vector2[]) {
    if (points.length !== 4) {
      throw 'Rectangles must always have 4 points';
    }
    this._point0 = points[0];
    this._point1 = points[1];
    this._point2 = points[2];
    this._point3 = points[3];
  }

  containsPoint(point: Vector2) {
    const tl = this.getTopLeft();
    const br = this.getBottomRight();

    return point.x >= tl.x && point.x <= br.x && point.y >= tl.y && point.y <= br.y;
  }

  getWidth(): number {
    return Math.sqrt(
      Math.pow(this.getTopLeft().x - this.getTopRight().x, 2) +
      Math.pow(this.getTopLeft().y - this.getTopRight().y, 2)
    );
  }

  getHeight(): number {
    return Math.sqrt(
      Math.pow(this.getBottomLeft().x - this.getTopLeft().x, 2) +
      Math.pow(this.getBottomLeft().y - this.getTopLeft().y, 2)
    );
  }

  getCenter(): Vector2 {
    return this._vector2Middle(this.getTopLeft(), this.getBottomRight());
  }

  getTopMiddle(): Vector2 {
    return this._vector2Middle(this.getTopLeft(), this.getTopRight());
  }

  getBottomMiddle(): Vector2 {
    return this._vector2Middle(this.getBottomLeft(), this.getBottomRight());
  }

  getLeftMiddle(): Vector2 {
    return this._vector2Middle(this.getBottomLeft(), this.getTopLeft());
  }

  getRightMiddle(): Vector2 {
    return this._vector2Middle(this.getBottomRight(), this.getTopRight());
  }

  getTopLeft(): Vector2 {
    return this._point0;
  }

  getTopRight(): Vector2 {
    return this._point1;
  }

  getBottomRight(): Vector2 {
    return this._point2;
  }

  getBottomLeft(): Vector2 {
    return this._point3;
  }

  protected _vector2Middle(a: Vector2, b: Vector2) {
    return a.clone()
      .add(b)
      .scale(.5);
  }
}
