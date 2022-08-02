/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

import { EasingBack } from '../src/back';
import { genericInOut, genericOut } from './generic';

describe('easing back test suit', () => {

  it('easeBackIn(t) returns the expected results', () => {
    expect(EasingBack.easeIn.getRatio(0.0)).toBeCloseTo(0.000000, 6);
    expect(EasingBack.easeIn.getRatio(0.1)).toBeCloseTo(-0.014314, 6);
    expect(EasingBack.easeIn.getRatio(0.2)).toBeCloseTo(-0.046451, 6);
    expect(EasingBack.easeIn.getRatio(0.3)).toBeCloseTo(-0.080200, 6);
    expect(EasingBack.easeIn.getRatio(0.4)).toBeCloseTo(-0.099352, 6);
    expect(EasingBack.easeIn.getRatio(0.5)).toBeCloseTo(-0.087698, 6);
    expect(EasingBack.easeIn.getRatio(0.6)).toBeCloseTo(-0.029028, 6);
    expect(EasingBack.easeIn.getRatio(0.7)).toBeCloseTo(+0.092868, 6);
    expect(EasingBack.easeIn.getRatio(0.8)).toBeCloseTo(+0.294198, 6);
    expect(EasingBack.easeIn.getRatio(0.9)).toBeCloseTo(+0.591172, 6);
    expect(EasingBack.easeIn.getRatio(1.0)).toBeCloseTo(+1.000000, 6);
  });

  it('easeBackOut(t) returns the expected results', () => {
    const genericEaseOut = genericOut(t => EasingBack.easeIn.getRatio(t));
    expect(EasingBack.easeOut.getRatio(0.0)).toBeCloseTo(genericEaseOut(0.0), 6);
    expect(EasingBack.easeOut.getRatio(0.1)).toBeCloseTo(genericEaseOut(0.1), 6);
    expect(EasingBack.easeOut.getRatio(0.2)).toBeCloseTo(genericEaseOut(0.2), 6);
    expect(EasingBack.easeOut.getRatio(0.3)).toBeCloseTo(genericEaseOut(0.3), 6);
    expect(EasingBack.easeOut.getRatio(0.4)).toBeCloseTo(genericEaseOut(0.4), 6);
    expect(EasingBack.easeOut.getRatio(0.5)).toBeCloseTo(genericEaseOut(0.5), 6);
    expect(EasingBack.easeOut.getRatio(0.6)).toBeCloseTo(genericEaseOut(0.6), 6);
    expect(EasingBack.easeOut.getRatio(0.7)).toBeCloseTo(genericEaseOut(0.7), 6);
    expect(EasingBack.easeOut.getRatio(0.8)).toBeCloseTo(genericEaseOut(0.8), 6);
    expect(EasingBack.easeOut.getRatio(0.9)).toBeCloseTo(genericEaseOut(0.9), 6);
    expect(EasingBack.easeOut.getRatio(1.0)).toBeCloseTo(genericEaseOut(1.0), 6);
  });

  it('easeBackInOut(t) returns the expected results', () => {
    const genericEaseInOut = genericInOut(t => EasingBack.easeIn.getRatio(t));
    expect(EasingBack.easeInOut.getRatio(0.0)).toBeCloseTo(genericEaseInOut(0.0), 6);
    expect(EasingBack.easeInOut.getRatio(0.1)).toBeCloseTo(genericEaseInOut(0.1), 6);
    expect(EasingBack.easeInOut.getRatio(0.2)).toBeCloseTo(genericEaseInOut(0.2), 6);
    expect(EasingBack.easeInOut.getRatio(0.3)).toBeCloseTo(genericEaseInOut(0.3), 6);
    expect(EasingBack.easeInOut.getRatio(0.4)).toBeCloseTo(genericEaseInOut(0.4), 6);
    expect(EasingBack.easeInOut.getRatio(0.5)).toBeCloseTo(genericEaseInOut(0.5), 6);
    expect(EasingBack.easeInOut.getRatio(0.6)).toBeCloseTo(genericEaseInOut(0.6), 6);
    expect(EasingBack.easeInOut.getRatio(0.7)).toBeCloseTo(genericEaseInOut(0.7), 6);
    expect(EasingBack.easeInOut.getRatio(0.8)).toBeCloseTo(genericEaseInOut(0.8), 6);
    expect(EasingBack.easeInOut.getRatio(0.9)).toBeCloseTo(genericEaseInOut(0.9), 6);
    expect(EasingBack.easeInOut.getRatio(1.0)).toBeCloseTo(genericEaseInOut(1.0), 6);
  });
});
