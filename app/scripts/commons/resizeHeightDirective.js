'use strict';

/**
 * Height directive
 */

angular.module('b.directives.height', []).
    directive('resizeHeight', function ($window) {
        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        function calculateHeight(windowHeight, offset) {
            if (!offset) return windowHeight;
            offset = offset.trim();
            if (endsWith(offset, "%")) {
                var ps = offset.substr(0, offset.length - 1);
                return windowHeight - Math.round(windowHeight * parseInt(ps) / 100);
            }
            return windowHeight - parseInt(offset);
        }

        return {
            replace: false,
            restrict: 'EA',
            scope: {
                offset: "@"
            },
            link: function (scope, elem, attrs) {
                var win = angular.element($window);
                var handler = function () {
                    elem.height(calculateHeight(win.innerHeight(), scope.offset));
                };
                win.bind("resize", _.debounce(handler, 50));
                handler();

                scope.$on('$destroy', function() {
                    win.unbind("resize");
                });
            }
        };
    });
