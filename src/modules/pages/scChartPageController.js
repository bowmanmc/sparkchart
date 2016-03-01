'use strict';
var moment = require('moment');


module.exports = function(ngModule) {

    ngModule.controller('scChartPageController', function($scope) {

        var generateData = function() {
            var i, ts;
            var results = [];
            var numDays = 100;
            for (i = 0; i < numDays; i++) {
                ts = moment().subtract((numDays - i), 'days').format('YYYY-MM-DD 12:01:02');
                results.push({
                    timestamp: ts,
                    value: Math.floor(Math.random() * 100 + 1)
                });
            }
            return results;
        };

        var initialize = function() {
            console.log('scChartPageController initializing...');

            $scope.result = {
                filename: '20160101120203-FooBarBaz.xml',
                timestmap: '2016-01-05 12:02:03',
                numPoints: 245,
                signature: [generateData(), generateData()],
                confidence: 0.55,
                download: 'http://foobarbaz.com'
            };
        };
        initialize();

    });
};
