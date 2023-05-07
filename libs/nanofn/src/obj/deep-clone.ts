import { _clone } from '../_internal/_clone';

export function deepClone(value: any) {
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, true);
}
