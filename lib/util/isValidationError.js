'use strict';

module.exports = e => e._v6eError;
// since both `e.constructor.name === 'ValidationError'` and
// `e instanceof ValidationError` weren't consistent in all environments,
// we're using this "hack" to work around the limitation of extending the
// builtin Error class