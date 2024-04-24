import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.BLf9wQjt.js","_app/immutable/chunks/scheduler.CfI31boP.js","_app/immutable/chunks/index.Dm9AE3zf.js","_app/immutable/chunks/gsapConfig.Ba4eRj7i.js","_app/immutable/chunks/index.DlcwD2fr.js","_app/immutable/chunks/Icon.Dsusn72x.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/config.1Q9_AXxH.js"];
export const stylesheets = [];
export const fonts = [];
