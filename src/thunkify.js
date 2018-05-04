/**
 * 专为Generator Function 设计的thunkify 函数
 * Thunkify 函数有什么用？回答是以前确实没什么用
 * 但是 ES6 有了 Generator 函数，Thunkify 函数现在可以用于 Generator 函数的自动流程管理。
 * 
 * @param {Function} fn 需要thunkify 的目标函数
 * @see https://github.com/tj/node-thunkify 
 */
function thunkify(fn) {
    return function() {
        var args = new Array(arguments.length);
        var ctx = this;

        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        return function(done) {
            var called;

            args.push(function() {
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });

            try {
                fn.apply(ctx, args);
            } catch (error) {
                done(error);
            }
        };
    };
}

module.exports = thunkify;
