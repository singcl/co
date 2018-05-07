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
            // 增加callback 函数参数大于等于3个兼容
            // 当参数大于等于3个时 resolve的data是一个数组
            args.push(function () {
                var args2 = Array.prototype.slice.call(arguments);
                var err = args2[0];
                if (err) return reject(err);

                var data = args2.slice(1);
                if (data.length > 1) {
                    resolve(data);
                } else {
                    resolve(data[0]);
                }
            });
            fn.apply(ctx, args);
        });
    };
}

module.exports = promisify;
