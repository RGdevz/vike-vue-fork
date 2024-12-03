import { PageContext } from 'vike/types';
import { PageContextInternal } from '../types/PageContext.js';
import { ConfigFromHookResolved } from '../types/Config.js';
export { getHeadSetting };
declare function getHeadSetting<T>(configName: keyof ConfigFromHookResolved, pageContext: PageContext & PageContextInternal): undefined | T;
