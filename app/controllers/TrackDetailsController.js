"use strict";

MusicHistory.controller('TrackDetailsController', [
    '$http', 
    '$scope',
    'AuthFactory',

    function ($http, $scope, AuthFactory) {

        $scope.track = null;
        $scope.user = AuthFactory.getUser();

        $http
            .get('http://localhost:5000/api/Tracks/2')
            .success(inv => $scope.track = inv);
        }

]);