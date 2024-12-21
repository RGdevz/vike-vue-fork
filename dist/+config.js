const globalName = (target, value) => Object.defineProperty(target, "name", {
  value,
  configurable: true
});
globalThis.__name = globalName;
function ssrEffect({ configDefinedAt, configValue }) {
  if (typeof configValue !== "boolean") throw new Error(`${configDefinedAt} should be a boolean`);
  const env = {
    // Always load on the client-side.
    client: true,
    // When the SSR flag is false, we want to render the page only on the client-side.
    // We achieve this by loading `Page` only on the client-side: when onRenderHtml()
    // gets a `Page` value that is undefined it skip server-side rendering.
    server: configValue !== false
  };
  return {
    meta: {
      Page: { env }
    }
  };
}
const config = {
  name: "vike-vue",
  require: {
    vike: ">=0.4.191"
  },
  // https://vike.dev/onRenderHtml
  onRenderHtml: "import:vike-vue/__internal/integration/onRenderHtml:onRenderHtml",
  // https://vike.dev/onRenderClient
  onRenderClient: "import:vike-vue/__internal/integration/onRenderClient:onRenderClient",
  // https://vike.dev/passToClient
  // It is a cumulative config option, so a web app using vike-vue can extend
  // this list.
  passToClient: ["fromHtmlRenderer", "_configFromHook"],
  // https://vike.dev/clientRouting
  clientRouting: true,
  hydrationCanBeAborted: true,
  // https://vike.dev/meta
  meta: {
    Head: {
      env: { server: true },
      cumulative: true
    },
    Layout: {
      env: { server: true, client: true },
      cumulative: false
    },
    title: {
      env: { server: true, client: true }
    },
    description: {
      env: { server: true }
    },
    image: {
      env: { server: true }
    },
    viewport: {
      env: { server: true }
    },
    favicon: {
      env: { server: true },
      global: true
    },
    lang: {
      env: { server: true, client: true }
    },
    ssr: {
      env: { config: true },
      effect: ssrEffect
    },
    stream: {
      env: { server: true }
    },
    onCreateApp: {
      env: { server: true, client: true },
      cumulative: true
    },
    onBeforeRenderHtml: {
      env: { server: true },
      cumulative: true
    },
    onAfterRenderHtml: {
      env: { server: true },
      cumulative: true
    },
    onBeforeRenderClient: {
      env: { server: false, client: true },
      cumulative: true
    },
    onAfterRenderClient: {
      env: { server: false, client: true },
      cumulative: true
    },
    bodyHtmlBegin: {
      env: { server: true },
      cumulative: true,
      global: true
    },
    bodyHtmlEnd: {
      env: { server: true },
      cumulative: true,
      global: true
    },
    htmlAttributes: {
      env: { server: true },
      global: true,
      cumulative: true
      // for Vike extensions
    },
    bodyAttributes: {
      env: { server: true },
      global: true,
      cumulative: true
      // for Vike extensions
    }
  }
};
export {
  config as default
};
//# sourceMappingURL=+config.js.map
