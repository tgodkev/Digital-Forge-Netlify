import * as universal from '../entries/pages/services/_page.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/services/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/services/+page.js";
export const imports = ["_app/immutable/nodes/14.B6X0HQoc.js","_app/immutable/chunks/scheduler.CHCJOVQ5.js","_app/immutable/chunks/index.Bp0dP5r4.js","_app/immutable/chunks/Faqs.U5aktVTV.js","_app/immutable/chunks/gsapConfig.B9xfzAST.js","_app/immutable/chunks/index.BXrxRkUw.js","_app/immutable/chunks/Icon.CzCHkq0R.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/config.Bh72stB7.js"];
export const stylesheets = [];
export const fonts = [];
