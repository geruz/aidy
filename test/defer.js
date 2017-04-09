'use strict';

const {promise, plugins: {defer, recover}} = require('../');
const assert = require('assert');

describe('aidy defer plugin', function () {
    describe('call defer', function () {
        it('The defer order is desc ', function () {
            return promise(function *() {
                const res = [];
                yield defer(() => res.push(1));
                yield defer(() => res.push(2));
                yield defer(() => res.push(3));
                yield defer(() => res.push(4));
                res.push(0);
                return res;
            }())
            .then(x => assert.deepEqual(x, [0, 4, 3, 2, 1]));
        });
    });
    describe('call recover', function () {
        it('The recover order is desc ', function () {
            return promise(
                 function *() {
                     const res = [];
                     yield recover(() => {
                         res.push(1); return res;
                     });
                     yield defer(() => res.push(2));
                     yield defer(() => res.push(3));
                     yield defer(() => res.push(4));
                     res.push(0);
                     throw new Error('Custom error');
                 }()
            )
            .then(x => assert.deepEqual(x, [0, 4, 3, 2, 1]));
        });
    });
});
