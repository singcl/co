var fs = require('fs');
var path = require('path');

var co = require('../index');
var thunkify = co.thunkify;

var reaFileThunkify = thunkify(fs.readFile);
var filePath1 = path.resolve(__dirname, './test.txt');
var filePath2 = path.resolve(__dirname, './co.exam.js');

co(function* (path) {
    var a = yield reaFileThunkify(path, 'utf8');
    var b = yield reaFileThunkify(path, 'utf8');
    var c = yield reaFileThunkify(path, 'utf8');
    console.log(a);
    console.log(b);
    console.log(c);
}, filePath1);

co(function* (path) {
    var a = reaFileThunkify(path, 'utf8');
    var b = reaFileThunkify(path, 'utf8');
    var c = reaFileThunkify(path, 'utf8');
    var res = yield [a, b, c];
    console.log(res);
}, filePath2)(function(err, data) {
    if (err) console.log(err);
    console.log('co 执行完成！', data);
});

