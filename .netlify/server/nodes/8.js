import * as server from '../entries/pages/blog/category/_category_/page/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/category/_category_/page/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/category/[category]/page/+page.server.js";
export const imports = ["_app/immutable/nodes/8.BF981OxK.js","_app/immutable/chunks/scheduler.CHCJOVQ5.js","_app/immutable/chunks/index.Bp0dP5r4.js"];
export const stylesheets = [];
export const fonts = [];
