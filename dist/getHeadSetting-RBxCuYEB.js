import { shallowRef, createSSRApp, createApp, shallowReactive, h, Fragment, nextTick } from "vue";
import { setPageContext } from "./hooks/usePageContext.js";
import { providePageContext } from "vike/getPageContext";
import { setData } from "./hooks/useData.js";
import { i as includes, c as configsCumulative } from "./includes-DAjktrRi.js";
function objectAssign(obj, objAddendum) {
  Object.assign(obj, objAddendum);
}
async function callCumulativeHooks(values, pageContext) {
  if (!values) return [];
  const valuesPromises = values.map((val) => {
    if (typeof val === "function") {
      providePageContext(pageContext);
      return val(pageContext);
    } else {
      return val;
    }
  });
  const valuesResolved = await Promise.all(valuesPromises);
  return valuesResolved;
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  return (
    /* Doesn't work in Cloudflare Pages workers
    value.constructor === Object
    */
    value.constructor.name === "Object"
  );
}
async function createVueApp(pageContext, ssr, entryComponentName) {
  let onChangePage;
  let RootComponent;
  if (entryComponentName === "Page") {
    const entryComponentRef = shallowRef(pageContext.config[entryComponentName]);
    const layoutRef = shallowRef(pageContext.config.Layout || []);
    onChangePage = (pageContext2) => {
      entryComponentRef.value = pageContext2.config[entryComponentName];
      layoutRef.value = pageContext2.config.Layout || [];
    };
    const EntryComponent = () => h(entryComponentRef.value);
    RootComponent = () => {
      let componentWithLayout = EntryComponent;
      console.log(layoutRef.value);
      layoutRef.value.forEach(
        (layout) => {
          const Comp = componentWithLayout;
          componentWithLayout = () => h(layout, null, Comp);
        }
      );
      return componentWithLayout();
    };
  } else {
    RootComponent = () => {
      var _a;
      const HeadElements = [
        // Added by +Head
        ...pageContext.config.Head ?? [],
        // Added by useConfig()
        ...((_a = pageContext._configFromHook) == null ? void 0 : _a.Head) ?? []
      ].map((HeadComponent) => h(HeadComponent));
      return h(Fragment, null, HeadElements);
    };
  }
  const app = ssr ? createSSRApp(RootComponent) : createApp(RootComponent);
  objectAssign(pageContext, { app });
  const { onCreateApp } = pageContext.config;
  await callCumulativeHooks(onCreateApp, pageContext);
  const data = pageContext.data ?? {};
  assertDataIsObject(data);
  const dataReactive = shallowReactive(data);
  const pageContextReactive = shallowReactive(pageContext);
  setPageContext(app, pageContextReactive);
  setData(app, dataReactive);
  const changePage = async (pageContext2) => {
    let returned = false;
    let err;
    app.config.errorHandler = (err_) => {
      if (returned) {
        console.error(err_);
      } else {
        err = err_;
      }
    };
    const data2 = pageContext2.data ?? {};
    assertDataIsObject(data2);
    objectReplace(dataReactive, data2);
    objectReplace(pageContextReactive, pageContext2);
    onChangePage == null ? void 0 : onChangePage(pageContext2);
    await nextTick();
    returned = true;
    if (err) throw err;
  };
  return { app, changePage };
}
function assertDataIsObject(data) {
  if (!isPlainObject(data)) throw new Error("data() should return a plain object, undefined, or null");
}
function objectReplace(obj, objAddendum) {
  Object.keys(obj).forEach((key) => delete obj[key]);
  Object.assign(obj, objAddendum);
}
function isCallable(thing) {
  return thing instanceof Function || typeof thing === "function";
}
function getHeadSetting(configName, pageContext) {
  var _a;
  const valFromUseConfig = (_a = pageContext._configFromHook) == null ? void 0 : _a[configName];
  const valFromConfig = pageContext.config[configName];
  const getCallable = (val) => isCallable(val) ? val(pageContext) : val;
  if (!includes(configsCumulative, configName)) {
    if (valFromUseConfig !== void 0) return valFromUseConfig;
    return getCallable(valFromConfig);
  } else {
    return [
      //
      ...(valFromConfig ?? []).map(getCallable),
      ...valFromUseConfig ?? []
    ];
  }
}
export {
  callCumulativeHooks as a,
  createVueApp as c,
  getHeadSetting as g,
  objectAssign as o
};
//# sourceMappingURL=getHeadSetting-RBxCuYEB.js.map
