angular.module('b').controller('view2Ctrl', function ($scope, fileReader) {
    $scope.image = null;
    $scope.imageFileName = '';

    $scope.fileMeta = {};

    $scope.$watch('fileMeta.uuid', function () {
        fileReader($scope.fileMeta.file)
            .then(function (result) {
                $scope.image = result;
            }, null, function (progress) {
                console.log("progress", progress);
            });
    });
});