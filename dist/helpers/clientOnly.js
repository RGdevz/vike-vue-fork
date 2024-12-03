import { defineComponent, shallowRef, onBeforeMount, nextTick, h } from "vue";
function clientOnly(load) {
  const componentWrapper = defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      const componentLoaded = shallowRef(null);
      const error = shallowRef(null);
      onBeforeMount(async () => {
        try {
          const ret = await load();
          componentLoaded.value = "default" in ret ? ret.default : ret;
        } catch (e) {
          console.error("Error while loading clientOnly() component:", e);
          nextTick(() => {
            error.value = e;
          });
        }
      });
      return () => {
        if (componentLoaded.value !== null) {
          return h(componentLoaded.value, attrs, slots);
        }
        if (slots["client-only-fallback"]) {
          return slots["client-only-fallback"]({ error: error.value, attrs });
        }
        if (slots["fallback"]) {
          return slots["fallback"]({ error: error.value, attrs });
        }
      };
    },
    slots: {}
  });
  return componentWrapper;
}
export {
  clientOnly
};
//# sourceMappingURL=clientOnly.js.map
