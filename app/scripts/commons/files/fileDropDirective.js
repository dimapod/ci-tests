'use strict';
angular.module('b.directives.fileDrop', [])
    .directive('fileDrop', function () {
        return {
            restrict: 'EA',
            scope: {
                fileMeta: '='
            },
            link: function (scope, element, attrs) {
                var uuid = 1;
                jQuery && jQuery.event.props.push("dataTransfer");

                var processDrop = function (event) {
                    if (event == null) return false;
                    event.preventDefault();

                    scope.$apply(function () {
                        scope.fileMeta = {
                            uuid: uuid++,
                            file: event.dataTransfer.files[0],
                            name: event.dataTransfer.files[0].name
                        };
                    });

                    return false;
                };

                element.bind('dragover', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'copy';
                });
                element.bind('dragenter', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    element.addClass('on-drag-enter');
                });
                element.bind('dragleave', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    element.removeClass('on-drag-enter');
                });
                element.bind('drop', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    element.removeClass('on-drag-enter');
                    return processDrop(e);
                });

            }
        };
    });
