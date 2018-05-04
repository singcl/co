// var run = require('./src/run');
// var wrap = require('./src/wrap');
var thunkify = require('./src/thunkify');
var promisify = require('./src/promisify');
// var co = require('./src/co');

var cov4 = require('./src/co-4.x');

// exports = module.exports = co;
exports = module.exports = cov4;

exports.thunkify = thunkify;
exports.promisify = promisify;
// exports.run = run;
// exports.wrap = wrap;
