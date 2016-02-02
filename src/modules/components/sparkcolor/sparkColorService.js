'use strict';

var colorbrewer = require('./colorbrewer');

module.exports = function(ngModule) {

    ngModule.service('ColorService', function() {

        this.SCALES = Object.keys(colorbrewer);
        this.INTERVALS = [3, 4, 5, 6, 7, 8, 9];

        this.getScale = function(scaleName = 'Set1', interval = 3) {
            return colorbrewer[scaleName][interval];
        };

    });

};
