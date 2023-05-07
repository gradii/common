/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */


export function setter(obj: any, path: (string | number)[] | string, value: any): void {
  if (typeof path === 'string') {
    path = path.split('.');
  }
  const last = path.pop();
  for (const p of path) {
    if (obj[p] == null) {
      obj[p] = {};
    }
    obj = obj[p];
  }
  obj[last] = value;


  const paths      = Array.isArray(path)
    ? path
    : String(path)
      .replace(/\[(\w+)\]/g, '.$1')
      .replace(/\["(\w+)"\]/g, '.$1')
      .replace(/\['(\w+)'\]/g, '.$1')
      .split('.')
      .map(it => it.match(/^\d+$/) ? Number(it) : it);
  let result       = obj;
  const latestPath = paths.pop();
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    if (result[p] == null) {
      result = typeof (i + 1 > paths.length ? latestPath : paths[i + 1]) === 'number' ? [] : {};
    } else {
      result = result[p];
    }
  }
  result[latestPath] = value;
}

