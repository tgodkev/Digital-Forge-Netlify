import * as server from '../entries/pages/blog/page/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/page/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/page/+page.server.js";
export const imports = ["_app/immutable/nodes/11.7S7aCOjh.js","_app/immutable/chunks/scheduler.CfI31boP.js","_app/immutable/chunks/index.Dm9AE3zf.js"];
export const stylesheets = [];
export const fonts = [];
