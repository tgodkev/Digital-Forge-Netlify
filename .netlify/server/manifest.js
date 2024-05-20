export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["admin/config.yml","admin/index.html","digitalforge-logo.svg","favicon.png","images/jefferson-santos-fCEJGBzAkrU-unsplash.jpg","images/jerry-zhang-ePpaQC2c1xA-unsplash.jpg","images/linus-nylund-Q5QspluNZmM-unsplash.jpg","images/tri1.svg","images/undraw_digital_nomad_re_w8uy.svg","link.svg"]),
	mimeTypes: {".yml":"text/yaml",".html":"text/html",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.D3sSbYPj.js","app":"_app/immutable/entry/app.Chm17izo.js","imports":["_app/immutable/entry/start.D3sSbYPj.js","_app/immutable/chunks/entry.DF8CeL90.js","_app/immutable/chunks/scheduler.CHCJOVQ5.js","_app/immutable/chunks/index.BXrxRkUw.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/entry/app.Chm17izo.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.CHCJOVQ5.js","_app/immutable/chunks/index.Bp0dP5r4.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
