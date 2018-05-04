// wrap
function wrap (fn, ctx) {
    return function () {
        var args = [].slice.call(arguments);
        return function (done) {
            args.push(done);
            fn.apply(ctx || this, args);
        };
    };
}

module.exports = wrap;
