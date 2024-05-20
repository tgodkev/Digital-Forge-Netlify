import * as universal from '../entries/pages/blog/_post_/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_post_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/[post]/+page.js";
export const imports = ["_app/immutable/nodes/5.D3LVDPIO.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.CzR0xuCU.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/scheduler.CHCJOVQ5.js","_app/immutable/chunks/index.Bp0dP5r4.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = [];
export const fonts = [];
