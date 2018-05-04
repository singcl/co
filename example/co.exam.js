var fs = require('fs');
var path = require('path');

var co = require('../index');
var thunkify = co.thunkify;
var promisify = co.promisify;

var reaFileThunkify = thunkify(fs.readFile);
var reaFilePromisify = promisify(fs.readFile);

var filePath1 = path.resolve(__dirname, './test.txt');
var filePath2 = path.resolve(__dirname, './co.exam.js');

co(function* (path) {
    var a = yield reaFileThunkify(path, 'utf8');
    var b = yield reaFileThunkify(path, 'utf8');
    var c = yield reaFileThunkify(path, 'utf8');
    console.log(a);
    console.log(b);
    console.log(c);
}, filePath1).then(function(v) {
    console.log('co完成！', v);
});

co(function* (path) {
    var a = reaFilePromisify(path, 'utf8');
    var b = reaFilePromisify(path, 'utf8');
    var c = reaFilePromisify(path, 'utf8');
    var res = yield [a, b, c];
    console.log(res);
}, filePath2).then(function(v) {
    console.log('co完成！', v);
});

