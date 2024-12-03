import { defineComponent, watchEffect } from "vue";
import { useConfig } from "../../hooks/useConfig/useConfig-client.js";
import { Head as noop } from "../Head/Head-client.js";
import { c as configsFromHook } from "../../Config-FmdIxs2P.js";
const Config = defineComponent(
  (props) => {
    const config = useConfig();
    watchEffect(() => {
      config(props);
    });
    return noop;
  },
  {
    name: "Config",
    inheritAttrs: false,
    props: [...configsFromHook]
  }
);
export {
  Config
};
//# sourceMappingURL=Config-client.js.map
