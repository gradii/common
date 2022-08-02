/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { EasingQuad } from '..';
import { genericInOut, genericOut } from './generic';

describe('easing quad test suit', () => {
  it('easeQuadIn(t) returns the expected results', () => {
    expect(EasingQuad.easeIn.getRatio(0.0)).toBeCloseTo(0.00, 6);
    expect(EasingQuad.easeIn.getRatio(0.1)).toBeCloseTo(0.01, 6);
    expect(EasingQuad.easeIn.getRatio(0.2)).toBeCloseTo(0.04, 6);
    expect(EasingQuad.easeIn.getRatio(0.3)).toBeCloseTo(0.09, 6);
    expect(EasingQuad.easeIn.getRatio(0.4)).toBeCloseTo(0.16, 6);
    expect(EasingQuad.easeIn.getRatio(0.5)).toBeCloseTo(0.25, 6);
    expect(EasingQuad.easeIn.getRatio(0.6)).toBeCloseTo(0.36, 6);
    expect(EasingQuad.easeIn.getRatio(0.7)).toBeCloseTo(0.49, 6);
    expect(EasingQuad.easeIn.getRatio(0.8)).toBeCloseTo(0.64, 6);
    expect(EasingQuad.easeIn.getRatio(0.9)).toBeCloseTo(0.81, 6);
    expect(EasingQuad.easeIn.getRatio(1.0)).toBeCloseTo(1.00, 6);
  });

  it('easeQuadOut(t) returns the expected results', () => {
    const genericEaseOut = genericOut(t => EasingQuad.easeIn.getRatio(t));
    expect(EasingQuad.easeOut.getRatio(0.0)).toBeCloseTo(genericEaseOut(0.0), 6);
    expect(EasingQuad.easeOut.getRatio(0.1)).toBeCloseTo(genericEaseOut(0.1), 6);
    expect(EasingQuad.easeOut.getRatio(0.2)).toBeCloseTo(genericEaseOut(0.2), 6);
    expect(EasingQuad.easeOut.getRatio(0.3)).toBeCloseTo(genericEaseOut(0.3), 6);
    expect(EasingQuad.easeOut.getRatio(0.4)).toBeCloseTo(genericEaseOut(0.4), 6);
    expect(EasingQuad.easeOut.getRatio(0.5)).toBeCloseTo(genericEaseOut(0.5), 6);
    expect(EasingQuad.easeOut.getRatio(0.6)).toBeCloseTo(genericEaseOut(0.6), 6);
    expect(EasingQuad.easeOut.getRatio(0.7)).toBeCloseTo(genericEaseOut(0.7), 6);
    expect(EasingQuad.easeOut.getRatio(0.8)).toBeCloseTo(genericEaseOut(0.8), 6);
    expect(EasingQuad.easeOut.getRatio(0.9)).toBeCloseTo(genericEaseOut(0.9), 6);
    expect(EasingQuad.easeOut.getRatio(1.0)).toBeCloseTo(genericEaseOut(1.0), 6);
  });

  it('easeQuadInOut(t) returns the expected results', () => {
    const genericEaseInOut = genericInOut(t => EasingQuad.easeIn.getRatio(t));
    expect(EasingQuad.easeInOut.getRatio(0.0)).toBeCloseTo(genericEaseInOut(0.0), 6);
    expect(EasingQuad.easeInOut.getRatio(0.1)).toBeCloseTo(genericEaseInOut(0.1), 6);
    expect(EasingQuad.easeInOut.getRatio(0.2)).toBeCloseTo(genericEaseInOut(0.2), 6);
    expect(EasingQuad.easeInOut.getRatio(0.3)).toBeCloseTo(genericEaseInOut(0.3), 6);
    expect(EasingQuad.easeInOut.getRatio(0.4)).toBeCloseTo(genericEaseInOut(0.4), 6);
    expect(EasingQuad.easeInOut.getRatio(0.5)).toBeCloseTo(genericEaseInOut(0.5), 6);
    expect(EasingQuad.easeInOut.getRatio(0.6)).toBeCloseTo(genericEaseInOut(0.6), 6);
    expect(EasingQuad.easeInOut.getRatio(0.7)).toBeCloseTo(genericEaseInOut(0.7), 6);
    expect(EasingQuad.easeInOut.getRatio(0.8)).toBeCloseTo(genericEaseInOut(0.8), 6);
    expect(EasingQuad.easeInOut.getRatio(0.9)).toBeCloseTo(genericEaseInOut(0.9), 6);
    expect(EasingQuad.easeInOut.getRatio(1.0)).toBeCloseTo(genericEaseInOut(1.0), 6);
  });
});
