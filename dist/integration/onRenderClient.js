import { c as createVueApp, o as objectAssign, a as callCumulativeHooks, g as getHeadSetting } from "../getHeadSetting-RBxCuYEB.js";
import { a as applyHeadSettings } from "../applyHeadSettings-B0wJc4FV.js";
let app;
let changePage;
const onRenderClient = async (pageContext) => {
  pageContext._configFromHook ?? (pageContext._configFromHook = {});
  pageContext._headAlreadySetWrapper = { val: pageContext.isHydration };
  pageContext.isRenderingHead = void 0;
  if (!app) {
    const container = document.getElementById("app");
    const ssr = container.innerHTML !== "";
    const res = await createVueApp(pageContext, ssr, "Page");
    changePage = res.changePage;
    app = res.app;
    objectAssign(pageContext, { app });
    await callCumulativeHooks(pageContext.config.onBeforeRenderClient, pageContext);
    app.mount(container);
  } else {
    objectAssign(pageContext, { app });
    await callCumulativeHooks(pageContext.config.onBeforeRenderClient, pageContext);
    await changePage(pageContext);
  }
  if (!pageContext.isHydration) {
    pageContext._headAlreadySetWrapper.val = true;
    applyHead(pageContext);
  }
  await callCumulativeHooks(pageContext.config.onAfterRenderClient, pageContext);
};
function applyHead(pageContext) {
  const title = getHeadSetting("title", pageContext);
  const lang = getHeadSetting("lang", pageContext);
  applyHeadSettings(title, lang);
}
export {
  onRenderClient
};
//# sourceMappingURL=onRenderClient.js.map
