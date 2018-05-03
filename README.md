## CO
[![npm (scoped)](https://img.shields.io/npm/v/@singcl/co.svg?style=flat-square)](https://www.npmjs.com/package/@singcl/co)
![David](https://img.shields.io/david/dev/singcl/co.svg?style=flat-square)
![David](https://img.shields.io/david/singcl/co.svg?style=flat-square)
[![npm](https://img.shields.io/npm/dm/@singcl/co.svg?style=flat-square)](https://www.npmjs.com/package/@singcl/thunk-run)

*A counterfeit co refer to [co](https://github.com/tj/co/tree/master).*

Generator based flow-control goodness for nodejs, using thunks or promises, letting you write non-blocking code in a nice-ish way.

Co is careful to relay any errors that occur back to the generator, including those within the thunk, or from the thunk's callback. "Uncaught" exceptions in the generator are then either passed co()'s thunk or thrown.
### Installation
`npm install @singcl/co`

### Example
```js
var fs = require('fs');
var path = require('path');

var co = require('@singcl/co').co;
// var run = require('@singcl/co').run
var thunkify = require('@singcl/co').thunk;

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
});

```