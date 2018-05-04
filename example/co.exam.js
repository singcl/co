var fs = require('fs');
var path = require('path');

var thunkify = require('../index').thunk;
var co = require('../index').co;
// var run = require('../index').run;

var reaFileThunkify = thunkify(fs.readFile);
var filePath = path.resolve(__dirname, './test.txt');

co(function* () {
    var a = yield reaFileThunkify(filePath, 'utf8');
    var b = yield reaFileThunkify(filePath, 'utf8');
    var c = yield reaFileThunkify(filePath, 'utf8');
    console.log(a);
    console.log(b);
    console.log(c);
});

co(function* () {
    var a = reaFileThunkify(filePath, 'utf8');
    var b = reaFileThunkify(filePath, 'utf8');
    var c = reaFileThunkify(filePath, 'utf8');
    var res = yield [a, b, c];
    console.log(res);
})(function(err, data) {
    if (err) console.log(err);
    console.log('co 执行完成！', data);
});

