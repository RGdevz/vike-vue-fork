import { defineComponent } from "vue";
import { useConfig } from "../../hooks/useConfig/useConfig-server.js";
import { Head as noop } from "./Head-client.js";
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup(_, { slots }) {
    if (slots.default != null) {
      const config = useConfig();
      const els = slots.default();
      config({
        Head: () => els.map((el) => ({
          ...el,
          // remove CSS scope marker (data-v-...)
          scopeId: void 0
        }))
      });
    }
    return noop;
  }
});
export {
  Head
};
//# sourceMappingURL=Head-server.js.map
