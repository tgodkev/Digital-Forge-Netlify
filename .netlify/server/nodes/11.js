import * as server from '../entries/pages/blog/page/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/page/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/page/+page.server.js";
export const imports = ["_app/immutable/nodes/11.BF981OxK.js","_app/immutable/chunks/scheduler.CHCJOVQ5.js","_app/immutable/chunks/index.Bp0dP5r4.js"];
export const stylesheets = [];
export const fonts = [];
