import { ConfigEffect } from 'vike/types';
export { ssrEffect };
declare function ssrEffect({ configDefinedAt, configValue }: Parameters<ConfigEffect>[0]): ReturnType<ConfigEffect>;
