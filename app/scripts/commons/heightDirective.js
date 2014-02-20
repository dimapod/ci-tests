'use strict';

/**
 * Height directive
*/

angular.module('b.directives.height', []).
    directive('bHeight', function () {
        return {
            replace: true,
            restrict: 'EA',
            scope: {
            },
            template: '<span>Hello</span>'
        };
    });
