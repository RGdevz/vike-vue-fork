import { Component, SlotsType } from 'vue';
export { clientOnly };
/**
 * Load and render a component only on the client-side.
 *
 * https://vike.dev/clientOnly
 */
declare function clientOnly<ComponentLoaded extends Component>(load: () => Promise<ComponentLoaded | {
    default: ComponentLoaded;
}>): import('vue').DefineComponent<{}, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, SlotsType<{
    fallback: {
        error: unknown;
        attrs: Record<string, any>;
    };
    'client-only-fallback': {
        error: unknown;
        attrs: Record<string, any>;
    };
}>, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any> & ComponentLoaded;
