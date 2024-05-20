import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.rlO1D51P.js","_app/immutable/chunks/index.CzR0xuCU.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/chunks/scheduler.CHCJOVQ5.js","_app/immutable/chunks/index.Bp0dP5r4.js","_app/immutable/chunks/index.BXrxRkUw.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/gsapConfig.B9xfzAST.js","_app/immutable/chunks/Icon.CzCHkq0R.js","_app/immutable/chunks/index.DI0JubaD.js","_app/immutable/chunks/config.Bh72stB7.js","_app/immutable/chunks/entry.DF8CeL90.js"];
export const stylesheets = ["_app/immutable/assets/0.hxqvTvTH.css"];
export const fonts = ["_app/immutable/assets/galindo-latin-ext-400-normal.c0O9VQrT.woff2","_app/immutable/assets/galindo-latin-ext-400-normal.BNOjLBsJ.woff","_app/immutable/assets/galindo-latin-400-normal.BWnArgO9.woff2","_app/immutable/assets/galindo-latin-400-normal.IYcEd0Rq.woff","_app/immutable/assets/cormorant-garamond-cyrillic-ext-400-normal.DSMdNVE8.woff2","_app/immutable/assets/cormorant-garamond-cyrillic-ext-400-normal.VkYjgaS0.woff","_app/immutable/assets/cormorant-garamond-cyrillic-400-normal.CUyuoOIN.woff2","_app/immutable/assets/cormorant-garamond-cyrillic-400-normal.CDK5Gr3o.woff","_app/immutable/assets/cormorant-garamond-vietnamese-400-normal.jSNF4ReH.woff2","_app/immutable/assets/cormorant-garamond-vietnamese-400-normal.DHTeb68E.woff","_app/immutable/assets/cormorant-garamond-latin-ext-400-normal.BP5VYi0K.woff2","_app/immutable/assets/cormorant-garamond-latin-ext-400-normal.6tP91n7k.woff","_app/immutable/assets/cormorant-garamond-latin-400-normal.CUJuyepZ.woff2","_app/immutable/assets/cormorant-garamond-latin-400-normal.GnKTm10X.woff"];
