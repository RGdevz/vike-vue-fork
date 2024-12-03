import { inject } from "vue";
const key = "vike-vue:useData";
function useData() {
  const data = inject(key);
  return data;
}
function setData(app, data) {
  app.provide(key, data);
}
export {
  setData,
  useData
};
//# sourceMappingURL=useData.js.map
