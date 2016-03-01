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
            var index = 0;
            $scope.data.forEach(function(dataset) {
                var x = d3.time.scale()
                    .domain(d3.extent(dataset, function(d) {
                        return moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').toDate();
                    }))
                    .range([0, size.width]);

                var y = d3.scale.linear()
                    .domain(d3.extent(dataset, function(d) {
                        return d.value;
                    }))
                    .range([size.height, 0]);

                var line = d3.svg.line()
                    .x(function(d) {
                        return x(moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').toDate());
                    })
                    .y(function(d) { return y(d.value); });

                drawLine(dataset, {
                    index: index,
                    lineFunction: line,
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
