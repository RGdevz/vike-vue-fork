import { App } from 'vue';
import { PageContext } from 'vike/types';
import { PageContextInternal } from '../types/PageContext';
export { createVueApp };
export type { ChangePage };
type ChangePage = (pageContext: PageContext) => Promise<void>;
declare function createVueApp(pageContext: PageContext & PageContextInternal, ssr: boolean, entryComponentName: 'Head' | 'Page'): Promise<{
    app: App<any>;
    changePage: ChangePage;
}>;
export declare function objectReplace(obj: object, objAddendum: object): void;
