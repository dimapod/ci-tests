'use strict';

angular.module('b', [
        'ngRoute',
        'b.filters',
        'b.services',
        'b.directives',
        'b.directives.height',
        'b.directives.fileDrop',
        'b.services.fileReader'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {templateUrl: 'scripts/main/view1/view1.tpl.html', controller: 'view1Ctrl'});
        $routeProvider.when('/view2', {templateUrl: 'scripts/main/view2/view2.tpl.html', controller: 'view2Ctrl'});
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
