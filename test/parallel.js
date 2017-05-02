'use strict';

const {promise, plugins: {parallel}} = require('../');
const assert = require('assert');

const createTimeoutPromise = function (res) {
    return new Promise(resolve => {
        setTimeout(() => resolve(res), 100);
    });
};
describe('parallel array', function () {
    describe('yield parallel', function () {
        it('array calculated', function () {
            return promise(function *() {
                return yield parallel([
                    createTimeoutPromise(1),
                    createTimeoutPromise(2),
                    createTimeoutPromise(3),
                    createTimeoutPromise(4),
                ]);
            }())
            .then(x => assert.deepEqual(x, [1, 2, 3, 4]));
        });
    });
});

describe('parallel array', function () {
    describe('yield parallel', function () {
        it('catch exception', function () {
            return promise(function *() {
                try {
                    const res = yield parallel([
                        createTimeoutPromise(1),
                        createTimeoutPromise(2),
                        createTimeoutPromise(3),
                        createTimeoutPromise(4),
                        Promise.reject('exc'),
                    ]);
                    return res;
                } catch (e) {
                    return e;
                }
            }())
            .then(x => assert.equal(x, 'exc'));
        });
    });
});
