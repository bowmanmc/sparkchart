'use strict';
var moment = require('moment');

module.exports = function(ngModule) {

    ngModule.controller('sparkLineController', function($scope, $element, ColorService) {

        var drawLine = function(data, context) {
            var color = ColorService.getScale($scope.scale)[context.index];
            console.log('Color for scale ' + $scope.scale + ' [' + context.index + '] = ' + color);
            context.svg.append('path')
                .datum(data)
                .attr('class', 'sc-line')
                .attr('stroke', color)
                .attr('d', context.lineFunction);
        };

        var renderData = function(size) {

            var margin = 0;
            if (size.width > 200 && size.height > 100) {
                margin = 20;
            }

            // build up domain/range
            var allData = [];
            $scope.data.forEach(function(dataset) {
                allData = allData.concat(dataset);
            });

            var x = d3.time.scale()
                .domain(d3.extent(allData, function(d) {
                    return moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').toDate();
                }))
                .range([0, size.width - margin]);

            var y = d3.scale.linear()
                .domain(d3.extent(allData, function(d) {
                    return d.value;
                }))
                .range([size.height - margin, 0]);

            var line = d3.svg.line()
                .x(function(d) {
                    return x(moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').toDate());
                })
                .y(function(d) { return y(d.value); });

            // Draw the axes
            if (size.width > 200 && size.height > 100) {
                console.log('Drawing axis...');
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');

                d3.select($element[0]).select('.sc__line-axisx')
                    .attr('transform', 'translate(0, ' + (size.height - margin) + ')')
                    .call(xAxis);

                d3.select($element[0]).select('.sc__line-axisy')
                    .call(yAxis)
                .append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 6)
                    .attr('dy', '.71em')
                    .style('text-anchor', 'end')
                    .text('');
            }

            // Draw the lines
            var index = 0;
            $scope.data.forEach(function(dataset) {
                drawLine(dataset, {
                    index: index,
                    lineFunction: line,
                    margin: margin,
                    svg: d3.select($element[0]).select('svg')
                });
                index++;
            });

        };

        var initChart = function(size) {
            d3.select($element[0]).select('svg')
                .attr({
                    'height': size.height,
                    'width': size.width
                });
            // set loading
        };

        var initialize = function() {
            //console.log('  this: ' + $element[0].offsetHeight);
            //console.log('parent: ' + $element[0].parentElement.offsetHeight);
            /*
             * Sizing here is a little complicated. Width/Height specified by
             * the user of the tag gets priority. Then, we auto-size to the
             * containing element. Then, we just guess at 100x300.
             */
            var size = {
                height: $scope.height || $element[0].parentElement.offsetHeight || 300,
                width: $scope.width || $element[0].parentElement.offsetWidth || 100
            };

            //console.log('sparkLineController initializing...');
            //console.log('    size: ' + JSON.stringify(size));
            initChart(size);
            renderData(size);
        };
        initialize();
    });
};
