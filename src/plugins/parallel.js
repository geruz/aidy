'use strict';

/*eslint-disable no-param-reassign */
const {markers, promise} = require('../aidy');
const {registrate} = require('./promise');
registrate();
class ParallelArray {
    constructor (arr) {
        if (!Array.isArray(arr)) {
            throw new Error(`ParallelArray: ${arr} is not Array`);
        }
        this._arr = arr;
    }
    static create (arr) {
        return new ParallelArray(arr);
    }
}

ParallelArray.prototype[markers.async] = function (pa, step, context) {
    const promises = pa._arr.map(x => promise(function *(){return x;}(), context));
    Promise.all(promises)
        .then(x => step(undefined, x))
        .catch(err => step(err, undefined));
};

module.exports = {
    parallel: ParallelArray.create,
};
