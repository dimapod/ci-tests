'use strict';

angular.module('b.services.fileReader', [])
    .factory("fileReader", function ($q) {
        var onLoad = function (reader, deferred) {
            return function () {
                deferred.resolve(reader.result);
            };
        };

        var onError = function (reader, deferred) {
            return function () {
                deferred.reject(reader.result);
            };
        };

        var onProgress = function (deferred) {
            return function (event) {
                deferred.notify({
                    total: event.total,
                    loaded: event.loaded
                });
            };
        };

        var getReader = function (deferred) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred);
            reader.onerror = onError(reader, deferred);
            reader.onprogress = onProgress(deferred);
            return reader;
        };

        return function (file) {
            var deferred = $q.defer();

            var reader = getReader(deferred);

            if (file.type.indexOf("text") == 0) {
                reader.readAsText(file);
            } else {
                reader.readAsDataURL(file);
            }

            return deferred.promise;
        };
    });
