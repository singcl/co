function co(fn, ctx) {
    var args = Array.prototype.slice.call(arguments, 1);
    var gen = isGenerator(fn) ? fn : fn.apply(this, args);

    ctx = ctx || this;
    var done;

    function next(err, res) {
        var ret;

        // multiple args
        if (arguments.length > 2) {
            res = [].slice.call(arguments, 1);
        }

        // error
        if (err) {
            try {
                ret = gen.throw(err);
            } catch (e) {
                if (!done) throw e;
                return done(e);
            }
        }

        // ok
        if (!err) {
            try {
                ret = gen.next(res);
            } catch (e) {
                if (!done) throw e;
                return done(e);
            }
        }

        // done
        if (ret.done) {
            if (done) done(null, ret.value);
            return;
        }

        // normalize
        ret.value = toThunk(ret.value, ctx);

        // run 
        if (typeof ret.value === 'function') {
            try {
                ret.value.call(ctx, next);
            } catch (e) {
                setImmediate(function () {
                    next(e);
                });
            }
            return;
        }

        // invalid
        next(new Error('yield a function, promise, generator, or array'));
    }

    setImmediate(next);
    return function (fn) {
        done = fn;
    };
}


exports.wrap = function (fn, ctx) {
    return function () {
        var args = [].slice.call(arguments);
        return function (done) {
            args.push(done);
            fn.apply(ctx || this, args);
        };
    };
};

exports.join = function (fns) {
    if (!Array.isArray(fns)) fns = [].slice.call(arguments);
    var ctx = this;

    return function (done) {
        var pending = fns.length;
        var results = new Array(pending);
        var finished;

        if (!pending) {
            setImmediate(function () {
                done(null, results);
            });
            return;
        }

        for (var i = 0; i < fns.length; i++) {
            run(fns[i], i);
        }

        function run(fn, i) {
            if (finished) return;
            try {
                fn = toThunk(fn, ctx);

                fn.call(ctx, function (err, res) {
                    if (finished) return;

                    if (err) {
                        finished = true;
                        return done(err);
                    }

                    results[i] = res;

                    --pending || done(null, results);
                });
            } catch (err) {
                finished = true;
                return done(err);
            }
        }
    };
};

function isGenerator(obj) {
    return obj && '[object Generator]' == Object.prototype.toString.call(obj);
}

function isGeneratorFunction(obj) {
    return obj && obj.constructor && 'GeneratorFunction' == obj.constructor.name;
}

function isPromise(obj) {
    return obj && 'function' == typeof obj.then;
}

function promiseToThunk(promise) {
    return function (fn) {
        promise.then(function (res) {
            fn(null, res);
        }, fn);
    };
}

function toThunk(obj, ctx) {
    if (Array.isArray(obj)) obj = exports.join.call(ctx, obj);
    if (isGeneratorFunction(obj)) obj = obj.call(ctx);
    if (isGenerator(obj)) obj = co(obj, ctx);
    if (isPromise(obj)) obj = promiseToThunk(obj);
    return obj;
}

// @module A counterfeit co.
module.exports = co;