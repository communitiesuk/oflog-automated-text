export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CC4P2h73.js","app":"_app/immutable/entry/app.CQr49CTq.js","imports":["_app/immutable/entry/start.CC4P2h73.js","_app/immutable/chunks/entry.C9Of7l2z.js","_app/immutable/chunks/runtime.Bn4_7S7u.js","_app/immutable/entry/app.CQr49CTq.js","_app/immutable/chunks/runtime.Bn4_7S7u.js","_app/immutable/chunks/store.Bkc2C8E5.js","_app/immutable/chunks/disclose-version.Cndwot9x.js","_app/immutable/chunks/index-client.CpzziGfP.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
