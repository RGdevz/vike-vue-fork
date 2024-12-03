import { defineComponent } from "vue";
import { useConfig } from "../../hooks/useConfig/useConfig-server.js";
import { Head as noop } from "../Head/Head-client.js";
import { c as configsFromHook } from "../../Config-FmdIxs2P.js";
const Config = defineComponent(
  (props) => {
    const config = useConfig();
    config({ ...props, Head: () => props.Head });
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
//# sourceMappingURL=Config-server.js.map
