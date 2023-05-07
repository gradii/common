/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

export { getter } from './obj/getter';
export { setter } from './obj/setter';

export { deepClone } from './obj/deep-clone';

export * from './check-type';

export { camelCase } from './case/camel-case';
export { capitalCase } from './case/capital-case';
export { kebabCase, slugCase } from './case/kebab-case';
export { lowerCase } from './case/lower-case';
export { lowerFirst } from './case/lower-first';
export { pascalCase } from './case/pascal-case';
export { snakeCase } from './case/snake-case';
export { startCase } from './case/start-case';
export { constantCase } from './case/constant-case';
export { upperCase } from './case/upper-case';
export { upperFirst } from './case/upper-first';

export { plural, pluralStudy, singular } from './plural/pluralize';
export { debounce } from './fn/debounce';

export { difference } from './collection/difference';
export { differenceBy } from './collection/difference-by';
export { differenceWith } from './collection/difference-with';
export { intersection } from './collection/intersection';
export { intersectionWith } from './collection/intersection-with';
export { unionWith } from './collection/union-with';
export { uniq } from './collection/uniq';
export { uniqBy } from './collection/uniq-by';
export { groupBy } from './collection/group-by';
