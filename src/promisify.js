/**
 * 基于回调的函数 promise 化
 * 用于 Generator 函数的自动流程管理的Promise 函数
 * 
 * @param {Function} fn 需要promisify 的目标函数
 */
function promisify(fn) {
    return function () {
        var ctx = this;
        var args = Array.prototype.slice.call(arguments);

        return new Promise(function (resolve, reject) {
            args.push(function (err, data) {
                if (err) return reject(err);
                resolve(data);
            });
            fn.apply(ctx, args);
        });
    };
}

module.exports = promisify;
