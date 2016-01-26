'use strict';

module.exports = function(ngModule) {

    ngModule.config(function($routeProvider) {
        $routeProvider
        .when('/', {
             controller: 'scMainPageController',
            templateUrl: 'modules/pages/scMainPageTemplate.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

};
