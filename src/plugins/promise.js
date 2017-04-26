'use strict';

/*eslint-disable no-param-reassign */
const {markers} = require('../aidy');

module.exports = {
    registrate: function () {
        Promise.prototype[markers.async] = function (val, step, context) {
            val
                .then(x => step(undefined, x))
                .catch(err => step(err, undefined));
        };
    },
};
