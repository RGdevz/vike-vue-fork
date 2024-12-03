import { inject } from "vue";
const key = "vike-vue:usePageContext";
function usePageContext() {
  const pageContext = inject(key);
  return pageContext;
}
function setPageContext(app, pageContext) {
  app.provide(key, pageContext);
}
export {
  setPageContext,
  usePageContext
};
//# sourceMappingURL=usePageContext.js.map
