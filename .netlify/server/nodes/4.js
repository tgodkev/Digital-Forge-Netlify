import * as server from '../entries/pages/blog/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/+page.server.js";
export const imports = ["_app/immutable/nodes/4.5pMmafIj.js","_app/immutable/chunks/scheduler.CHCJOVQ5.js","_app/immutable/chunks/index.Bp0dP5r4.js","_app/immutable/chunks/Pagination.CzSMqMD3.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/config.Bh72stB7.js"];
export const stylesheets = [];
export const fonts = [];
