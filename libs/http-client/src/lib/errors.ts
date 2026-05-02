/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * The list of error codes used by `@gradii/http-client`.
 * Mirrors the codes from `@angular/common/http`'s runtime errors,
 * but rendered as plain `Error` messages (no Angular RuntimeError plumbing).
 *
 * Reserved range: 2800-2899.
 */
export const enum RuntimeErrorCode {
  MISSING_JSONP_MODULE                            = -2800,
  HEADERS_ALTERED_BY_TRANSFER_CACHE               = -2802,
  CANNOT_SPECIFY_BOTH_FROM_STRING_AND_FROM_OBJECT = 2805,
  RESPONSE_IS_NOT_AN_ARRAY_BUFFER                 = 2806,
  RESPONSE_IS_NOT_A_BLOB                          = 2807,
  RESPONSE_IS_NOT_A_STRING                        = 2808,
  UNHANDLED_OBSERVE_TYPE                          = 2809,
  KEEPALIVE_NOT_SUPPORTED_WITH_XHR                = 2813,
  CACHE_NOT_SUPPORTED_WITH_XHR                    = 2814,
  PRIORITY_NOT_SUPPORTED_WITH_XHR                 = 2815,
  MODE_NOT_SUPPORTED_WITH_XHR                     = 2816,
  REDIRECT_NOT_SUPPORTED_WITH_XHR                 = 2817,
  CREDENTIALS_NOT_SUPPORTED_WITH_XHR              = 2818,
  WITH_CREDENTIALS_OVERRIDES_EXPLICIT_CREDENTIALS = 2819,
  INTEGRITY_NOT_SUPPORTED_WITH_XHR                = 2820,
  REFERRER_NOT_SUPPORTED_WITH_XHR                 = 2821,
  INVALID_TIMEOUT_VALUE                           = 2822,
  REFERRER_POLICY_NOT_SUPPORTED_WITH_XHR          = 2823,
  FETCH_UPLOAD_PROGRESS_NOT_SUPPORTED             = 2824,
}

export class HttpRuntimeError extends Error {
  constructor(public readonly code: RuntimeErrorCode, message: string) {
    super(formatMessage(code, message));
    this.name = 'HttpRuntimeError';
  }
}

function formatMessage(code: RuntimeErrorCode, message: string): string {
  return `NG0${Math.abs(code)}: ${message}`;
}
