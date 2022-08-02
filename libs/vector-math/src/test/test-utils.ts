/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Matrix2 } from '../src/matrix2';
import { Matrix3 } from '../src/matrix3';
import { Matrix4 } from '../src/matrix4';
import { Vector2 } from '../src/vector2';
import { Vector3 } from '../src/vector3';
import { Vector4 } from '../src/vector4';
import { absoluteError, relativeError } from './error-helpers';

export function $v2(x: number, y: number) {
  return new Vector2(x, y);
}

export function $v3(x: number, y: number, z: number) {
  return new Vector3(x, y, z);
}

export function $v4(x: number, y: number, z: number, w: number) {
  return new Vector4(x, y, z, w);
}

export function relativeTest(output, expectedOutput) {
  const errorThreshold = 0.0005;
  let error = Math.abs(relativeError(output, expectedOutput));
  expect(error >= errorThreshold).toBe(false);
}

export function absoluteTest(output, expectedOutput) {
  const errorThreshold = 0.0005;
  let error = Math.abs(absoluteError(output, expectedOutput));
  expect(error >= errorThreshold).toBe(false);
}

export function makeMatrix(rows: number, cols: number) {
  if (rows != cols) {
    return null;
  }
  if (cols == 2) {
    return Matrix2.zero();
  }
  if (cols == 3) {
    return Matrix3.zero();
  }
  if (cols == 4) {
    return Matrix4.zero();
  }
}

export function parseMatrix(input: string) {
  input = input.trim();
  let rows = input.split('\n');
  let values = [];
  let colCount = 0;
  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].trim();
    let cols = rows[i].split(' ');
    for (let j = 0; j < cols.length; j++) {
      cols[j] = cols[j].trim();
    }

    for (let j = 0; j < cols.length; j++) {
      if (/^\s*$/.exec(cols[j]) != null) {
        continue;
      }
      if (i == 0) {
        colCount++;
      }
      values.push(parseFloat(cols[j]));
    }
  }

  let m = makeMatrix(rows.length, colCount);
  for (let j = 0; j < rows.length; j++) {
    for (let i = 0; i < colCount; i++) {
      m.setEntry(j, i, values[j * colCount + i]);
    }
  }

  return m;
}

export function parseVector(v: string) {
  v = v.trim();
  const pattern = new RegExp('[\\s]+', 'mgi');
  let rows = v.split(pattern);
  let values = [];
  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].trim();
    if (/^\s*$/g.exec(rows[i]) != null) {
      continue;
    }
    values.push(parseFloat(rows[i]));
  }

  let r;
  if (values.length == 2) {
    r = new Vector2(values[0], values[1]);
  } else if (values.length == 3) {
    r = new Vector3(values[0], values[1], values[2]);
  } else if (values.length == 4) {
    r = new Vector4(values[0], values[1], values[2], values[3]);
  }

  return r;
}
