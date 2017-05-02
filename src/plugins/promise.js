'use strict';

/*eslint-disable no-param-reassign */
/*eslint-disable no-extend-native */
const {markers} = require('../aidy');

module.exports = {
    registrate: function () {
        if (Promise.prototype[markers.async]) {
            return;
        }
        Promise.prototype[markers.async] = function (val, step) {
            val
                .then(x => step(undefined, x))
                .catch(err => step(err, undefined));
        };
    },
};
