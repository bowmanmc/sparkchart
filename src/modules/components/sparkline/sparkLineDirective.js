'use strict';

module.exports = function(ngModule) {

    ngModule.directive('sparkLine', function() {
        return {
            restrict: 'EA',
            templateUrl: 'modules/components/sparkline/sparkLineTemplate.html',
            controller: 'sparkLineController',
            replace: false,
            scope: {
                data: '=',
                axis: '@',
                height: '@',
                width: '@',
                scale: '@'
            }
        };
    });
};
