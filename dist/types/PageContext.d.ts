import { App } from 'vue';
import { SSRContext } from 'vue/server-renderer';
import { ConfigFromHookResolved } from './Config';
import { PageHtmlStream } from '../integration/onRenderHtml';
export type { Component };
type Component = any;
declare global {
    namespace Vike {
        interface PageContext {
            Page?: Component;
            app?: App;
            /** @deprecated */
            fromHtmlRenderer: Record<string, unknown>;
            ssrContext?: SSRContext;
            /** The +Page.vue component rendered to the HTML string. */
            pageHtmlString?: string;
            /** The +Page.vue component rendered to an HTML stream. */
            pageHtmlStream?: PageHtmlStream;
            isRenderingHead?: boolean;
        }
    }
}
export type __FakeExport_PageContext = never;
export type PageContextInternal = {
    _configFromHook?: ConfigFromHookResolved;
    _headAlreadySetWrapper?: {
        val: boolean;
    };
};
