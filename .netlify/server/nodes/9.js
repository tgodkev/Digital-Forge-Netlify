import * as server from '../entries/pages/blog/category/_category_/page/_page_/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/category/_category_/page/_page_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/category/[category]/page/[page]/+page.server.js";
export const imports = ["_app/immutable/nodes/9.DY3C7Udd.js","_app/immutable/chunks/scheduler.CHCJOVQ5.js","_app/immutable/chunks/index.Bp0dP5r4.js","_app/immutable/chunks/Pagination.CzSMqMD3.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/config.Bh72stB7.js"];
export const stylesheets = [];
export const fonts = [];
