'use strict';
/*eslint-disable no-param-reassign */
const {markers} = require('../aidy');

const originNext = Symbol('origin-next');

const createDefer = (f, origin) => {
    const next = function (v) {
        let isCalled = false;
        try {
            const res = next[originNext](v);
            if (res.done) {
                isCalled = true;
                f();
            }
            return res;
        } catch (e) {
            if (!isCalled) {
                f();
            }
            throw e;
        }
    };
    next[originNext] = origin;
    return next;
};
const createRecover = (f, origin) => {
    const next = function (v) {
        try {
            return next[originNext](v);
        } catch (e) {
            return {done: true, value: f(e)};
        }
    };
    next[originNext] = origin;
    return next;
};

const mddlw = (factory, f) => (_, gen) => {
    if (gen.next[originNext]) {
        let first = gen.next;
        while (first[originNext][originNext]) {
            first = first[originNext];
        }
        const origin = first[originNext];
        first[originNext] = factory(f, origin);
    } else {
        gen.next = factory(f, gen.next.bind(gen));
    }
};
module.exports = {
    defer: f => ({[markers.mddlwr]: mddlw(createDefer, f)}),
    recover: f => ({[markers.mddlwr]: mddlw(createRecover, f)}),
};
