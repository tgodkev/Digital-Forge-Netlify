import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CG4pwQjf.js","_app/immutable/chunks/index.CzR0xuCU.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/scheduler.CfI31boP.js","_app/immutable/chunks/index.Dm9AE3zf.js","_app/immutable/chunks/index.DlcwD2fr.js","_app/immutable/chunks/gsapConfig.Ba4eRj7i.js","_app/immutable/chunks/Icon.Dsusn72x.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/index.C2kJW0xD.js","_app/immutable/chunks/config.1Q9_AXxH.js","_app/immutable/chunks/entry.DnqGaqp2.js"];
export const stylesheets = ["_app/immutable/assets/0.B-kuqwWv.css"];
export const fonts = ["_app/immutable/assets/galindo-latin-ext-400-normal.c0O9VQrT.woff2","_app/immutable/assets/galindo-latin-ext-400-normal.BNOjLBsJ.woff","_app/immutable/assets/galindo-latin-400-normal.BWnArgO9.woff2","_app/immutable/assets/galindo-latin-400-normal.IYcEd0Rq.woff","_app/immutable/assets/cormorant-garamond-cyrillic-ext-400-normal.DSMdNVE8.woff2","_app/immutable/assets/cormorant-garamond-cyrillic-ext-400-normal.VkYjgaS0.woff","_app/immutable/assets/cormorant-garamond-cyrillic-400-normal.CUyuoOIN.woff2","_app/immutable/assets/cormorant-garamond-cyrillic-400-normal.CDK5Gr3o.woff","_app/immutable/assets/cormorant-garamond-vietnamese-400-normal.jSNF4ReH.woff2","_app/immutable/assets/cormorant-garamond-vietnamese-400-normal.DHTeb68E.woff","_app/immutable/assets/cormorant-garamond-latin-ext-400-normal.BP5VYi0K.woff2","_app/immutable/assets/cormorant-garamond-latin-ext-400-normal.6tP91n7k.woff","_app/immutable/assets/cormorant-garamond-latin-400-normal.CUJuyepZ.woff2","_app/immutable/assets/cormorant-garamond-latin-400-normal.GnKTm10X.woff"];
