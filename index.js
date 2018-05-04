var run = require('./src/run');
var wrap = require('./src/wrap');
var thunkify = require('./src/thunkify');
var co = require('./src/co');

exports = module.exports = co;

exports.thunkify = thunkify;
exports.run = run;
exports.wrap = wrap;
