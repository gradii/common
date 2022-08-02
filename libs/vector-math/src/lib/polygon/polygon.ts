/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Matrix3 } from '../matrix3';
import { Vector2 } from '../vector2';
import { Rectangle } from './rectangle';

export class Polygon {
  protected points: Vector2[];

  constructor(points: Vector2[] = []) {
    this.points = points;
  }

  serialize() {
    return this.points.map((point) => {
      return [point.x, point.y];
    });
  }

  deserialize(data: any[]) {
    this.points = data.map((point) => {
      return new Vector2(point[0], point[1]);
    });
  }

  transform(matrix: Matrix3) {
    this.points.forEach((point) => {
      matrix.transformVector2(point);
    });
  }

  setPoints(points: Vector2[]) {
    this.points = points;
  }

  getPoints(): Vector2[] {
    return this.points;
  }

  translate(offsetX: number, offsetY: number) {
    this.points.forEach((point) => {
      point.add(new Vector2(offsetX, offsetY));
    });
  }

  rotate(degrees: number, origin?: Vector2) {
    if (!origin) {
      origin = this.getOrigin();
    }
    this.transform(Vector2.createRotateOriginMatrix3(degrees / (180 / Math.PI), origin));
  }

  scale(x: number, y: number, origin: Vector2) {
    let matrix = Vector2.createScaleOriginMatrix3(new Vector2(x, y), origin);

    this.points.forEach((point) => {
      matrix.transformVector2(point);
      // point.transform(matrix);
    });
  }

  doClone(ob: this) {
    this.points = ob.points.map((point) => {
      return point.clone();
    });
  }

  clone(): this {
    let ob = Object.create(this);
    ob.doClone(this);
    return ob;
  }

  getOrigin(): Vector2 | null {
    if (this.points.length === 0) {
      return null;
    }
    let dimensions = this.getBoundingBox();
    return this.vector2Middle(dimensions.getTopLeft(), dimensions.getBottomRight());
  }

  vector2Middle(a: Vector2, b: Vector2) {
    return a.clone()
      .add(b)
      .scale(.5);
  }

  getBoundingBox(): Rectangle {
    let minX = this.points[0].x;
    let maxX = this.points[0].x;
    let minY = this.points[0].y;
    let maxY = this.points[0].y;

    for (let i = 1; i < this.points.length; i++) {
      if (this.points[i].x < minX) {
        minX = this.points[i].x;
      }
      if (this.points[i].x > maxX) {
        maxX = this.points[i].x;
      }
      if (this.points[i].y < minY) {
        minY = this.points[i].y;
      }
      if (this.points[i].y > maxY) {
        maxY = this.points[i].y;
      }
    }

    return new Rectangle(
      new Vector2(minX, minY), new Vector2(maxX, minY),
      new Vector2(maxX, maxY), new Vector2(minX, maxY)
    );
  }
}
