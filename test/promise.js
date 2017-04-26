'use strict';

const {promise, plugins: {defer, recover}} = require('../');
const assert = require('assert');

const createTimeoutPromise = function (res) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(res), 100);
    });
};
describe('promise', function () {
    describe('yield promise', function () {
        it('promise calculated', function () {
            return promise(function *() {
                return yield createTimeoutPromise(12);
            }())
            .then(x => assert.equal(x, 12));
        });
    });
});
