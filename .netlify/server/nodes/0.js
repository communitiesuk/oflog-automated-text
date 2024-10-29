

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BpwnmYvO.js","_app/immutable/chunks/disclose-version.Cndwot9x.js","_app/immutable/chunks/runtime.Bn4_7S7u.js"];
export const stylesheets = [];
export const fonts = [];
