import { ConfigFromHook } from '../../types/Config.js';
export { useConfig };
/**
 * Set configurations inside components and Vike hooks.
 *
 * https://vike.dev/useConfig
 */
declare function useConfig(): (config: ConfigFromHook) => void;
