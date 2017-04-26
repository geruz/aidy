'use strict';

const mddlwr = Symbol('aidy middleware marker');
const async = Symbol('aidy async marker');

const yielder = function (gen, callback, context) {
    const step = function (err, value) {
        try {
            let res = err ? gen.throw(err) : {
                done: false,
                value,
            };
            while (!res.done) {
                const val = res.value;
                if (val) {
                    if (val[mddlwr]) {
                        val[mddlwr](val, gen, context);
                    }
                    if (val[async]) {
                        val[async](val, step, context);
                        return;
                    }
                }
                res = gen.next(val);
            }
            callback(undefined, res.value);
            return;
        } catch (exc) {
            callback(exc, undefined);
            return;
        }
    };
    return step;

};
const createPromise = function (gen, context) {
    return new Promise(function (resolve, reject) {
        yielder(gen,
            (err, data) => err === undefined ? resolve(data) : reject(err),
            context
        )();
    });
};

exports.markers = {
    mddlwr,
    async,
};

exports.promise = function (gen, context = {}) {
    if (gen.next instanceof Function && gen.throw instanceof Function) {
        return createPromise(gen, context);
    }
    throw new Error('aidy: Generator is bad');
};
