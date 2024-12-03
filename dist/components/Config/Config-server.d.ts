import { ConfigFromHook } from '../../types/Config.js';
export { Config };
/**
 * Set configurations inside Vue components.
 *
 * https://vike.dev/useConfig#config-head
 */
declare const Config: import('vue').DefineSetupFnComponent<ConfigFromHook, {}, {}, ConfigFromHook & {}, import('vue').PublicProps>;
