import { init } from '../serverless.js';

export const handler = init((() => {
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
		client: {"start":"_app/immutable/entry/start.Bj9YUh0I.js","app":"_app/immutable/entry/app.DdVYBgA5.js","imports":["_app/immutable/entry/start.Bj9YUh0I.js","_app/immutable/chunks/entry.Bb3CPd_I.js","_app/immutable/chunks/runtime.Bn4_7S7u.js","_app/immutable/entry/app.DdVYBgA5.js","_app/immutable/chunks/runtime.Bn4_7S7u.js","_app/immutable/chunks/store.Bkc2C8E5.js","_app/immutable/chunks/disclose-version.Cndwot9x.js","_app/immutable/chunks/index-client.CpzziGfP.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
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
})());