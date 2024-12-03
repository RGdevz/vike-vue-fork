import { usePageContext } from "../usePageContext.js";
import { getPageContext } from "vike/getPageContext";
import { a as applyHeadSettings } from "../../applyHeadSettings-B0wJc4FV.js";
import { watchEffect } from "vue";
function useConfig() {
  let pageContext = getPageContext();
  if (pageContext) return (config) => setPageContextConfigFromHook(config, pageContext);
  pageContext = usePageContext();
  return (config) => {
    watchEffect(() => {
      if (!pageContext._headAlreadySetWrapper.val) {
        setPageContextConfigFromHook(config, pageContext);
      } else {
        applyHead(config);
      }
    });
  };
}
function setPageContextConfigFromHook(config, pageContext) {
  pageContext._configFromHook ?? (pageContext._configFromHook = {});
  Object.assign(pageContext._configFromHook, config);
}
function applyHead(config) {
  const { title, lang } = config;
  applyHeadSettings(title, lang);
}
export {
  useConfig
};
//# sourceMappingURL=useConfig-client.js.map
