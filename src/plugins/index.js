'use strict';

const {defer, recover} = require('./defer');
const promise = require('./promise');
const {parallel} = require('./parallel');
module.exports = {
    defer,
    recover,
    promise,
    parallel,
};
