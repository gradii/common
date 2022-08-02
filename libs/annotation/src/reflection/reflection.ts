
import {ReflectionCapabilities} from './reflection_capabilities';
import {Reflector} from './reflector';

export {Reflector} from './reflector';

/**
 * The {@link Reflector} used internally in Angular to access metadata
 * about symbols.
 */
export const reflector = new Reflector(new ReflectionCapabilities());
