import { usePageContext } from "../usePageContext.js";
import { getPageContext } from "vike/getPageContext";
import { i as includes, c as configsCumulative } from "../../includes-DAjktrRi.js";
function objectKeys(obj) {
  return Object.keys(obj);
}
function useConfig() {
  let pageContext = getPageContext();
  if (pageContext) return (config) => setPageContextConfigFromHook(config, pageContext);
  pageContext = usePageContext();
  return (config) => {
    var _a;
    if (pageContext && !((_a = pageContext._headAlreadySetWrapper) == null ? void 0 : _a.val)) {
      setPageContextConfigFromHook(config, pageContext);
    } else {
      console.error("Using useConfig() with HTML streaming isn't supported yet");
      return;
    }
  };
}
const configsClientSide = ["title"];
function setPageContextConfigFromHook(config, pageContext) {
  pageContext._configFromHook ?? (pageContext._configFromHook = {});
  objectKeys(config).forEach((configName) => {
    var _a;
    if (pageContext.isClientSideNavigation && !configsClientSide.includes(configName)) return;
    if (!includes(configsCumulative, configName)) {
      const configValue = config[configName];
      if (configValue === void 0) return;
      pageContext._configFromHook[configName] = configValue;
    } else {
      const configValue = config[configName];
      if (!configValue) return;
      (_a = pageContext._configFromHook)[configName] ?? (_a[configName] = []);
      pageContext._configFromHook[configName].push(configValue);
    }
  });
}
export {
  useConfig
};
//# sourceMappingURL=useConfig-server.js.map
