import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { renderToString, renderToNodeStream, renderToWebStream } from "vue/server-renderer";
import { c as createVueApp, a as callCumulativeHooks, g as getHeadSetting } from "../getHeadSetting-RBxCuYEB.js";
function assert(condition) {
  if (condition) return;
  throw new Error("You stumbled upon a vike-vue bug, reach out on GitHub.");
}
function getTagAttributesString(tagAttributes) {
  const tagAttributesString = Object.entries(tagAttributes).filter(([_key, value]) => value !== false && value !== null && value !== void 0).map(([key, value]) => `${ensureIsValidAttributeName(key)}=${JSON.stringify(String(value))}`).join(" ");
  if (tagAttributesString.length === 0) return "";
  return ` ${tagAttributesString}`;
}
function ensureIsValidAttributeName(str) {
  if (/^[a-z][a-z0-9\-]*$/i.test(str) && !str.endsWith("-")) return str;
  throw new Error(`Invalid HTML tag attribute name ${JSON.stringify(str)}`);
}
const onRenderHtml = async (pageContext) => {
  const { pageHtml, fromHtmlRenderer } = await getPageHtml(pageContext);
  pageContext.isRenderingHead = true;
  const headHtml = await getHeadHtml(pageContext);
  pageContext.isRenderingHead = false;
  const { bodyHtmlBegin, bodyHtmlEnd } = await getBodyHtmlBoundary(pageContext);
  const { htmlAttributesString, bodyAttributesString } = getTagAttributes(pageContext);
  delete pageContext._configFromHook;
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html${dangerouslySkipEscape(htmlAttributesString)}>
      <head>
        <meta charset="UTF-8" />
        ${headHtml}
      </head>
      <body${dangerouslySkipEscape(bodyAttributesString)}>
        ${bodyHtmlBegin}
        <div id="app">${pageHtml}</div>
        ${bodyHtmlEnd}
      </body>
    </html>`;
  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
      fromHtmlRenderer
    }
  };
};
async function getPageHtml(pageContext) {
  let pageHtml = "";
  pageContext.ssrContext = {};
  const fromHtmlRenderer = {};
  let app;
  if (
    // Whether SSR is enabled
    !!pageContext.Page
  ) {
    const { app: app_ } = await createVueApp(pageContext, true, "Page");
    app = app_;
    pageContext.app = app;
  }
  await callCumulativeHooks(pageContext.config.onBeforeRenderHtml, pageContext);
  if (pageContext.Page) {
    assert(app);
    if (!pageContext.config.stream) {
      const pageHtmlString = await renderToStringWithErrorHandling(app, pageContext.ssrContext);
      pageContext.pageHtmlString = pageHtmlString;
      pageHtml = dangerouslySkipEscape(pageHtmlString);
    } else {
      const pageHtmlStream = pageContext.config.stream === "web" ? renderToWebStreamWithErrorHandling(app, pageContext.ssrContext) : renderToNodeStreamWithErrorHandling(app, pageContext.ssrContext);
      pageContext.pageHtmlStream = pageHtmlStream;
      pageHtml = pageHtmlStream;
    }
    const afterRenderResults = await callCumulativeHooks(pageContext.config.onAfterRenderHtml, pageContext);
    Object.assign(fromHtmlRenderer, ...afterRenderResults);
  }
  return { pageHtml, fromHtmlRenderer };
}
async function getHeadHtml(pageContext) {
  pageContext._headAlreadySetWrapper = { val: true };
  const title = getHeadSetting("title", pageContext);
  const favicon = getHeadSetting("favicon", pageContext);
  const description = getHeadSetting("description", pageContext);
  const image = getHeadSetting("image", pageContext);
  const titleTags = !title ? "" : escapeInject`<title>${title}</title><meta property="og:title" content="${title}">`;
  const faviconTag = !favicon ? "" : escapeInject`<link rel="icon" href="${favicon}" />`;
  const descriptionTags = !description ? "" : escapeInject`<meta name="description" content="${description}"><meta property="og:description" content="${description}">`;
  const imageTags = !image ? "" : escapeInject`<meta property="og:image" content="${image}"><meta name="twitter:card" content="summary_large_image">`;
  const viewportTag = dangerouslySkipEscape(getViewportTag(getHeadSetting("viewport", pageContext)));
  let headElementHtml = "";
  const { app } = await createVueApp(pageContext, true, "Head");
  headElementHtml = dangerouslySkipEscape(await renderToStringWithErrorHandling(app));
  const headHtml = escapeInject`
    ${titleTags}
    ${viewportTag}
    ${headElementHtml}
    ${faviconTag}
    ${descriptionTags}
    ${imageTags}
  `;
  return headHtml;
}
async function getBodyHtmlBoundary(pageContext) {
  var _a;
  const bodyHtmlBegin = dangerouslySkipEscape(
    (await callCumulativeHooks(pageContext.config.bodyHtmlBegin, pageContext)).join("")
  );
  const defaultTeleport = `<div id="teleported">${((_a = pageContext.ssrContext.teleports) == null ? void 0 : _a["#teleported"]) ?? ""}</div>`;
  const bodyHtmlEndHooks = [defaultTeleport, ...pageContext.config.bodyHtmlEnd ?? []];
  const bodyHtmlEnd = dangerouslySkipEscape((await callCumulativeHooks(bodyHtmlEndHooks, pageContext)).join(""));
  return { bodyHtmlBegin, bodyHtmlEnd };
}
function getTagAttributes(pageContext) {
  let lang = getHeadSetting("lang", pageContext);
  if (lang === void 0) lang = "en";
  const bodyAttributes = mergeTagAttributesList(getHeadSetting("bodyAttributes", pageContext));
  const htmlAttributes = mergeTagAttributesList(getHeadSetting("htmlAttributes", pageContext));
  const bodyAttributesString = getTagAttributesString(bodyAttributes);
  const htmlAttributesString = getTagAttributesString({ ...htmlAttributes, lang: lang ?? htmlAttributes.lang });
  return { htmlAttributesString, bodyAttributesString };
}
function mergeTagAttributesList(tagAttributesList = []) {
  const tagAttributes = {};
  tagAttributesList.forEach((tagAttrs) => Object.assign(tagAttributes, tagAttrs));
  return tagAttributes;
}
async function renderToStringWithErrorHandling(app, ctx) {
  let returned = false;
  let err;
  app.config.errorHandler = (err_) => {
    if (returned) {
      console.error(err_);
    } else {
      err = err_;
    }
  };
  const appHtml = await renderToString(app, ctx);
  returned = true;
  if (err) throw err;
  return appHtml;
}
function renderToNodeStreamWithErrorHandling(app, ctx) {
  let returned = false;
  let err;
  app.config.errorHandler = (err_) => {
    if (returned) {
      console.error(err_);
    } else {
      err = err_;
    }
  };
  const appHtml = renderToNodeStream(app, ctx);
  returned = true;
  if (err) throw err;
  return appHtml;
}
function renderToWebStreamWithErrorHandling(app, ctx) {
  let returned = false;
  let err;
  app.config.errorHandler = (err_) => {
    if (returned) {
      console.error(err_);
    } else {
      err = err_;
    }
  };
  const appHtml = renderToWebStream(app, ctx);
  returned = true;
  if (err) throw err;
  return appHtml;
}
function getViewportTag(viewport) {
  if (viewport === "responsive" || viewport === void 0) {
    return '<meta name="viewport" content="width=device-width,initial-scale=1">';
  }
  if (typeof viewport === "number") {
    return `<meta name="viewport" content="width=${viewport}">`;
  }
  return "";
}
export {
  onRenderHtml
};
//# sourceMappingURL=onRenderHtml.js.map
