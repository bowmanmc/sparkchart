'use strict';
var moment = require('moment');

module.exports = function(ngModule) {

    ngModule.controller('sparkLineController', function($scope, $element) {

        var width = 128;
        var height = 64;

        var renderData = function() {
            var x = d3.time.scale()
                .domain(d3.extent($scope.data[0], function(d) {
                    return moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').toDate();
                }))
                .range([0, width]);

            var y = d3.scale.linear()
                .domain(d3.extent($scope.data[0], function(d) {
                    return d.value;
                }))
                .range([height, 0]);

            var line = d3.svg.line()
                .x(function(d) {
                    return x(moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').toDate());
                })
                .y(function(d) { return y(d.value); });

            var svg = d3.select($element[0]).select('svg');

            svg.append('path')
                .datum($scope.data[0])
                .attr('class', 'sc-line')
                .attr('d', line);
        };

        var initChart = function() {
            d3.select($element[0]).select('svg')
                .attr({
                    'height': height,
                    'width': width
                });

            // set loading
        };

        var initialize = function() {
            console.log('sparkLineController initializing...');
            initChart();
            renderData();
        };
        initialize();
    });
};
