import { App, ShallowReactive } from 'vue';
export { useData };
export { setData };
/** https://vike.dev/useData */
declare function useData<Data>(): ShallowReactive<Data>;
declare function setData(app: App, data: ShallowReactive<unknown>): void;
