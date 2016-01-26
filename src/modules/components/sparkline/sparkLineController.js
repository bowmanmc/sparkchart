'use strict';

module.exports = function(ngModule) {

    ngModule.controller('sparkLineController', function($scope) {

        var initialize = function() {
            console.log('sparkLineController initializing...');
            $scope.data.forEach(function(line) {
                console.log('Num Points: ' + line.length);
                console.log('    ' + JSON.stringify(line[20]));
            });
        };
        initialize();
    });
};
