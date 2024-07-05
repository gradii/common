/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { Matrix2 } from '../src/lib/matrix2';
import { Vector2 } from '../src/lib/vector2';
import { parseMatrix, parseVector, relativeTest } from './test-utils';

describe('matrix2', () => {
  it('adjoint', () => {
    const input = [];
    const expectedOutput = [];

    input
      .push(parseMatrix(`0.830828627896291   0.549723608291140
                               0.585264091152724   0.917193663829810`));

    expectedOutput
      .push(parseMatrix(` 0.917193663829810  -0.549723608291140
                               -0.585264091152724   0.830828627896291`));

    input
      .push(parseMatrix(`1    0
                               0    1`));

    expectedOutput
      .push(parseMatrix(`1    0
                               0    1`));

    expect(input.length === expectedOutput.length).toBe(true);

    for (let i = 0; i < input.length; i++) {
      const output = input[i].clone();
      (output as Matrix2).scaleAdjoint(1);
      relativeTest(output, expectedOutput[i]);
    }
  });

  it('determinant', () => {
    const input = [];
    const expectedOutput = [];

    input.push(parseMatrix(`0.830828627896291   0.549723608291140
                                  0.585264091152724   0.917193663829810`));
    expectedOutput.push(0.440297265243183);

    expect(input.length == expectedOutput.length);

    for (let i = 0; i < input.length; i++) {
      const output = input[i].determinant();
      relativeTest(output, expectedOutput[i]);
    }
  });

  it('transform', () => {
    const rot = Matrix2.rotation(Math.PI / 4);
    const input = new Vector2(0.234245234259, 0.890723489233);

    const expected = new Vector2(
      rot.entry(0, 0) * input.x + rot.entry(0, 1) * input.y,
      rot.entry(1, 0) * input.x + rot.entry(1, 1) * input.y);

    const transExpected = new Vector2(
      rot.entry(0, 0) * input.x + rot.entry(1, 0) * input.y,
      rot.entry(0, 1) * input.x + rot.entry(1, 1) * input.y);

    relativeTest(rot.transformed(input), expected);
    relativeTest(rot.transposed().transformed(input), transExpected);
  });

  it('inversion', () => {
    const m = new Matrix2(4, 3, 3, 2);
    const result = Matrix2.zero();
    const det = result.copyInverse(m);
    expect(det).toBe(-1.0);
    expect(result.entry(0, 0)).toBe(-2.0);
    expect(result.entry(1, 0)).toBe(3.0);
    expect(result.entry(0, 1)).toBe(3.0);
    expect(result.entry(1, 1)).toBe(-4.0);
  });

  it('dot', () => {
    const matrix = new Matrix2(1, 3, 2, 4);
    const v = new Vector2(3, 4);

    expect(matrix.dotRow(0, v)).toBe(15);
    expect(matrix.dotRow(1, v)).toBe(22);
    expect(matrix.dotColumn(0, v)).toBe(11);
    expect(matrix.dotColumn(1, v)).toBe(25);
  });

  it('scale', () => {
    const m = parseMatrix(`1  3
                                          2  4`) as Matrix2;
    const n = m.scaled(2);

    expect(n.at(0)).toBe(2);
    expect(n.at(1)).toBe(6);
    expect(n.at(2)).toBe(4);
    expect(n.at(3)).toBe(8);
  });

  // it('solving', () => {
  //   expect(false).toBe(false)
  // })

  // it('equals', () => {
  // expect(false).toMatch()
  // });

  it('absolute', () => {
    const m = parseMatrix(`-1  -2
                                         3  -4`) as Matrix2;
    const expected = parseMatrix(`1  2
                                        3  4`) as Matrix2;
    const out = Matrix2.zero();
    const result = Matrix2.absolute(m, out);

    expect(result instanceof Matrix2).toBe(true);

    relativeTest(out, result);

    relativeTest(out, expected);
  });

  it('add', () => {
    const input = [];
    const expectedOutput = [];

    const m = parseMatrix(`1   1
                                 1   1`);

    input
      .push(parseMatrix(`1   3
                               4   5`));
    expectedOutput
      .push(parseMatrix(`2   4
                               5   6`));

    expect(input.length == expectedOutput.length);

    for (let i = 0; i < input.length; i++) {
      const output = input[i].add(m);
      relativeTest(output, expectedOutput[i]);
    }
  });

  it('sub', () => {
    const input = [];
    const expectedOutput = [];

    const m = parseMatrix(`1   1
                                 1   1`);

    input
      .push(parseMatrix(`2   4
                               5   6`));
    expectedOutput
      .push(parseMatrix(`1   3
                               4   5`));

    expect(input.length == expectedOutput.length);

    for (let i = 0; i < input.length; i++) {
      const output = input[i].sub(m);
      relativeTest(output, expectedOutput[i]);
    }
  });

  it('multiply', () => {
    const input = [];
    const expectedOutput = [];

    const m = parseMatrix(`7   8
                                 9   10`);

    input
      .push(parseMatrix(`2   4
                               5   6`));
    expectedOutput
      .push(parseMatrix(`50   56
                               89  100`));

    expect(input.length == expectedOutput.length);

    for (let i = 0; i < input.length; i++) {
      const output = input[i].multiply(m);
      relativeTest(output, expectedOutput[i]);
    }
  });

  it('transform', () => {
    const input = [];
    const expectedOutput = [];

    const v = parseVector(`7   8`);

    input
      .push(parseMatrix(`2   4
                               5   6`));
    expectedOutput
      .push(parseVector(`46  83`));

    expect(input.length == expectedOutput.length);

    for (let i = 0; i < input.length; i++) {
      const output = input[i].transform(v);
      relativeTest(output, input[i]);
      relativeTest(output, expectedOutput[i]);
    }
  });

  it('rotate', () => {
    const input = [];
    const expectedOutput = [];

    const r = Math.PI / 1.2;

    input
      .push(parseMatrix(`2   4
                               5   6`));
    expectedOutput
      .push(parseMatrix(`0.267949  -4.4641
                              -1.33013	 -7.69615`));

    expect(input.length == expectedOutput.length);

    const m = parseMatrix(`1  1
                                 1  1`) as Matrix2;
    relativeTest(m.clone().rotate(Math.PI / 2), new Matrix2(1, -1, 1, -1));
    relativeTest(m.clone().rotate(Math.PI / 4), new Matrix2(Math.SQRT2, 0, Math.SQRT2, 0));
    relativeTest(m.clone().rotate(Math.PI), new Matrix2(-1, -1, -1, -1));

    for (let i = 0; i < input.length; i++) {
      const output = input[i].rotate(r);
      relativeTest(output, input[i]);
      relativeTest(output, expectedOutput[i]);
    }
  });

});
