'use strict';
var moment = require('moment');


module.exports = function(ngModule) {

    var generateData = function() {
        var i, ts;
        var results = [];
        var numDays = 100;
        for (i = 0; i < numDays; i++) {
            ts = moment().subtract((numDays - i)).format('YYYY-MM-DD 12:01:02');
            results.push({
                timestamp: ts,
                value: Math.floor(Math.random() * 100 + 1)
            });
        }
        return results;
    };

    ngModule.controller('scMainPageController', function($scope) {

        $scope.results = [{
            filename: '20160101120203-FooBarBaz.xml',
            timestmap: '2016-01-01 12:02:03',
            numPoints: 283,
            signature: [generateData(), generateData()],
            confidence: 0.8,
            download: 'http://foobarbaz.com'
        }, {
            filename: '20160101120203-FooBarBaz.xml',
            timestmap: '2016-01-01 12:02:03',
            numPoints: 167,
            signature: [generateData(), generateData()],
            confidence: 0.75,
            download: 'http://foobarbaz.com'
        }, {
            filename: '20160101120203-FooBarBaz.xml',
            timestmap: '2016-01-01 12:02:03',
            numPoints: 84,
            signature: [generateData(), generateData()],
            confidence: 0.73,
            download: 'http://foobarbaz.com'
        }, {
            filename: '20160101120203-FooBarBaz.xml',
            timestmap: '2016-01-01 12:02:03',
            numPoints: 968,
            signature: [generateData(), generateData()],
            confidence: 0.64,
            download: 'http://foobarbaz.com'
        }, {
            filename: '20160101120203-FooBarBaz.xml',
            timestmap: '2016-01-01 12:02:03',
            numPoints: 245,
            signature: [generateData(), generateData()],
            confidence: 0.55,
            download: 'http://foobarbaz.com'
        }, {
            filename: '20160101120203-FooBarBaz.xml',
            timestmap: '2016-01-01 12:02:03',
            numPoints: 763,
            signature: [generateData(), generateData()],
            confidence: 0.53,
            download: 'http://foobarbaz.com'
        }];


        var initialize = function() {
            console.log('scMainPageController initializing...');
        };
        initialize();

    });
};
