const reqAll = reqCtx => reqCtx.keys().map(reqCtx);
const req = require.context('./svg', false, /\.svg$/);
reqAll(req);
