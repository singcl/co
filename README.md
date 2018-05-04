## CO
[![npm (scoped)](https://img.shields.io/npm/v/@singcl/co.svg?style=flat-square)](https://www.npmjs.com/package/@singcl/co)
![David](https://img.shields.io/david/dev/singcl/co.svg?style=flat-square)
![David](https://img.shields.io/david/singcl/co.svg?style=flat-square)
[![npm](https://img.shields.io/npm/dm/@singcl/co.svg?style=flat-square)](https://www.npmjs.com/package/@singcl/thunk-run)

*A counterfeit co refer to [co](https://github.com/tj/co/tree/master).*

Generator based flow-control goodness for nodejs, using thunks or promises, letting you write non-blocking code in a nice-ish way.

### Installation
`npm install @singcl/co -S`

### Example
```js
var fs = require('fs');
var path = require('path');

var co = require('@singcl/co');
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

```

### Yieldables
The "yieldable" objects currently supported are:

- promises
- thunks (functions)
- array (parallel execution)
- generators (delegation)
- generator functions (delegation)

### API

**API about more is at TJ`s [co](https://github.com/tj/co/tree/0.5.0)**