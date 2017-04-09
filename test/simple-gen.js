'use strict';

const {promise} = require('../');
const assert = require('assert');
const summGen = function *(a, b) {
    const a2 = yield a;
    const b2 = yield b;
    return a2 + b2;
};

describe('aidy promise', function () {
    describe('simple gen', function () {
        it('should return summ', function () {
            return promise(summGen(10, 12)).then(x => assert.equal(x, 22));
        });
    });
    describe('gen in gen', function () {
        it('should return summ', function () {
            return promise(function *() {
                const a1 = yield 10;
                const b1 = yield *summGen(11, 12);
                return a1 + b1;
            }()).then(x => assert.equal(x, 33));
        });
    });
});
