import * as server from '../entries/pages/blog/category/_category_/page/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/category/_category_/page/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/category/[category]/page/+page.server.js";
export const imports = ["_app/immutable/nodes/8.7S7aCOjh.js","_app/immutable/chunks/scheduler.CfI31boP.js","_app/immutable/chunks/index.Dm9AE3zf.js"];
export const stylesheets = [];
export const fonts = [];
