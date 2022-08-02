/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Vector2 } from '../vector2';
import { Rectangle } from './rectangle';

export function boundingBoxFromPolygons(polygons: Rectangle[]): Rectangle {
  return boundingBoxFromPoints(
    polygons.reduce((prev, polygon) => {
      return prev.concat([
        polygon.getPoints()
      ]);
    }, [])
  );
}

export function boundingBoxFromPoints(points: Vector2[]): Rectangle {
  if (points.length === 0) {
    return Rectangle.createFromBounds(0, 0, 0, 0);
  }

  let minX = points[0].x;
  let maxX = points[0].x;
  let minY = points[0].y;
  let maxY = points[0].y;

  for (let i = 1; i < points.length; i++) {
    if (points[i].x < minX) {
      minX = points[i].x;
    }
    if (points[i].x > maxX) {
      maxX = points[i].x;
    }
    if (points[i].y < minY) {
      minY = points[i].y;
    }
    if (points[i].y > maxY) {
      maxY = points[i].y;
    }
  }

  return new Rectangle(
    new Vector2(minX, minY), new Vector2(maxX, minY),
    new Vector2(maxX, maxY), new Vector2(minX, maxY)
  );
}
