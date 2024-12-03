import { App, ShallowReactive } from 'vue';
import { PageContext } from 'vike/types';
export { usePageContext };
export { setPageContext };
/** https://vike.dev/usePageContext */
declare function usePageContext(): ShallowReactive<PageContext>;
declare function setPageContext(app: App, pageContext: ShallowReactive<PageContext>): void;
