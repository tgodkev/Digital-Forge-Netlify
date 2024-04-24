

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.md.js')).default;
export const imports = ["_app/immutable/nodes/3.CEaekXRl.js","_app/immutable/chunks/scheduler.CfI31boP.js","_app/immutable/chunks/index.Dm9AE3zf.js"];
export const stylesheets = [];
export const fonts = [];
