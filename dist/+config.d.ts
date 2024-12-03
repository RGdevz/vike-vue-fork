import { ssrEffect } from './integration/ssrEffect.js';
export { config as default };
declare const config: {
    name: string;
    require: {
        vike: string;
    };
    onRenderHtml: "import:vike-vue/__internal/integration/onRenderHtml:onRenderHtml";
    onRenderClient: "import:vike-vue/__internal/integration/onRenderClient:onRenderClient";
    passToClient: string[];
    clientRouting: true;
    hydrationCanBeAborted: true;
    meta: {
        Head: {
            env: {
                server: true;
            };
            cumulative: true;
        };
        Layout: {
            env: {
                server: true;
                client: true;
            };
            cumulative: true;
        };
        title: {
            env: {
                server: true;
                client: true;
            };
        };
        description: {
            env: {
                server: true;
            };
        };
        image: {
            env: {
                server: true;
            };
        };
        viewport: {
            env: {
                server: true;
            };
        };
        favicon: {
            env: {
                server: true;
            };
            global: true;
        };
        lang: {
            env: {
                server: true;
                client: true;
            };
        };
        ssr: {
            env: {
                config: true;
            };
            effect: typeof ssrEffect;
        };
        stream: {
            env: {
                server: true;
            };
        };
        onCreateApp: {
            env: {
                server: true;
                client: true;
            };
            cumulative: true;
        };
        onBeforeRenderHtml: {
            env: {
                server: true;
            };
            cumulative: true;
        };
        onAfterRenderHtml: {
            env: {
                server: true;
            };
            cumulative: true;
        };
        onBeforeRenderClient: {
            env: {
                server: false;
                client: true;
            };
            cumulative: true;
        };
        onAfterRenderClient: {
            env: {
                server: false;
                client: true;
            };
            cumulative: true;
        };
        bodyHtmlBegin: {
            env: {
                server: true;
            };
            cumulative: true;
            global: true;
        };
        bodyHtmlEnd: {
            env: {
                server: true;
            };
            cumulative: true;
            global: true;
        };
        htmlAttributes: {
            env: {
                server: true;
            };
            global: true;
            cumulative: true;
        };
        bodyAttributes: {
            env: {
                server: true;
            };
            global: true;
            cumulative: true;
        };
    };
};
export type { __FakeExport_Config } from './types/Config.js';
export type { __FakeExport_PageContext } from './types/PageContext.js';
