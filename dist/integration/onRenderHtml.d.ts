import { OnRenderHtmlAsync } from 'vike/types';
import { renderToNodeStream, renderToWebStream } from 'vue/server-renderer';
export { onRenderHtml };
declare const onRenderHtml: OnRenderHtmlAsync;
export type PageHtmlStream = ReturnType<typeof renderToNodeStream> | ReturnType<typeof renderToWebStream>;
export type Viewport = 'responsive' | number | null;
