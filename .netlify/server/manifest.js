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
		client: {"start":"_app/immutable/entry/start.D7kNY4CC.js","app":"_app/immutable/entry/app.ChRfVpUy.js","imports":["_app/immutable/entry/start.D7kNY4CC.js","_app/immutable/chunks/entry.DnqGaqp2.js","_app/immutable/chunks/scheduler.CfI31boP.js","_app/immutable/chunks/index.DlcwD2fr.js","_app/immutable/chunks/control.CYgJF_JY.js","_app/immutable/entry/app.ChRfVpUy.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.CfI31boP.js","_app/immutable/chunks/index.Dm9AE3zf.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
