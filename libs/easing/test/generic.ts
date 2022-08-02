/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */

/**
 * This is a test file for test easy function, whether is correct.
 * the formal easy function is a optimistic algorithm.
 */

export function genericOut(easeIn) {
  return (t) => {
    return 1 - easeIn(1 - t);
  };
}

export function genericInOut(easeIn) {
  return (t) => {
    return (t < 0.5 ? easeIn(t * 2) : (2 - easeIn((1 - t) * 2))) / 2;
  };
}

/**
 * following function is used for create a convenient easeIn Function
 */

export function generateEasing(dummyCls, ...args) {
  return t => {
    const ins = dummyCls.constructor.apply(null, args);
    return ins.getRatio(t);
  };
}
