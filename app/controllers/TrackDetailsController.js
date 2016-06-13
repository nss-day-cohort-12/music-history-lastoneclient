"use strict";

MusicHistory.controller('TrackDetailsController', [
    '$http', 
    '$scope',
    'AuthFactory',
    '$routeParams',

    function ($http, $scope, AuthFactory, $routeParams) {

        $scope.track = null;
        $scope.user = AuthFactory.getUser();
        console.log($routeParams)

        $http
            .get(`http://localhost:5000/api/Tracks/${$routeParams.id}`)
            .success(inv => $scope.track = inv[0]);
        }

]);