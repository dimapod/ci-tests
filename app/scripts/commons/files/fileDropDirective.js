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

                var processDragOverOrEnter = function (event) {
                    if (!event) return false;
                    event.preventDefault();
                    event.dataTransfer.effectAllowed = 'copy';
                    return false;
                };

//                var validMimeTypes = attrs.fileDropzone;

//                var isTypeValid = function (type) {
//                    if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
//                        return true;
//                    } else {
//                        alert("Invalid file type.  File must be one of following types " + validMimeTypes);
//                        return false;
//                    }
//                };

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

                element.bind('dragover', processDragOverOrEnter);
                element.bind('dragenter', processDragOverOrEnter);
                element.bind('drop', processDrop);
            }
        };
    });
