/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { EasingLinear } from '..';

describe('easing linear test suit', () => {
  it('easeLinear(t) returns the expected results', () => {
    expect(EasingLinear.easeIn.getRatio(0.0)).toBe(0.0);
    expect(EasingLinear.easeIn.getRatio(0.1)).toBe(0.1);
    expect(EasingLinear.easeIn.getRatio(0.2)).toBe(0.2);
    expect(EasingLinear.easeIn.getRatio(0.3)).toBe(0.3);
    expect(EasingLinear.easeIn.getRatio(0.4)).toBe(0.4);
    expect(EasingLinear.easeIn.getRatio(0.5)).toBe(0.5);
    expect(EasingLinear.easeIn.getRatio(0.6)).toBe(0.6);
    expect(EasingLinear.easeIn.getRatio(0.7)).toBe(0.7);
    expect(EasingLinear.easeIn.getRatio(0.8)).toBe(0.8);
    expect(EasingLinear.easeIn.getRatio(0.9)).toBe(0.9);
    expect(EasingLinear.easeIn.getRatio(1.0)).toBe(1.0);
  });
});
