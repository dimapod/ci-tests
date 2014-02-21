angular.module('b').controller('view2Ctrl', function ($scope, fileReader) {
    $scope.image = null;
    $scope.imageFileName = '';

    $scope.fileMeta = {};

    $scope.$watch('fileMeta.uuid', function () {
        if (!$scope.fileMeta.file) return;
        console.log("type", $scope.fileMeta.file.type)
        fileReader($scope.fileMeta.file)
            .then(function (result) {
                if ($scope.fileMeta.file.type.indexOf("text") == 0) {
                    $scope.text = result;
                } else {
                    $scope.image = result;
                }
            }, null, function (progress) {
                console.log("progress", progress);
            });
    });
});