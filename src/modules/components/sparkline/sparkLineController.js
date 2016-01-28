'use strict';
var moment = require('moment');

module.exports = function(ngModule) {

    ngModule.controller('sparkLineController', function($scope, $element) {

        var margin = {
               top: 5,
             right: 10,
            bottom: 5,
              left: 10
        };
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

            // var xAxis = d3.svg.axis()
            //     .scale(x)
            //     .orient('bottom');
            //
            // var yAxis = d3.svg.axis()
            //     .scale(y)
            //     .orient('left');

            var line = d3.svg.line()
                .x(function(d) {
                    return x(moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').toDate());
                })
                .y(function(d) { return y(d.value); });

            var svg = d3.select($element[0]).select('svg');

            // svg.append('g')
            //     .attr('class', 'x axis')
            //     .attr('transform', 'translate(0,' + height + ')')
            //     .call(xAxis);
            //
            // svg.append('g')
            //     .attr('class', 'y axis')
            //     .call(yAxis)
            //     .append('text')
            //         .attr('transform', 'rotate(-90)')
            //         .attr('y', 6)
            //         .attr('dy', '.71em')
            //         .style('text-anchor', 'end')
            //         .text('Value');

            svg.append('path')
                .datum($scope.data[0])
                .attr('class', 'line')
                .attr('d', line);
        };

        var initChart = function() {
            d3.select($element[0]).select('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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
