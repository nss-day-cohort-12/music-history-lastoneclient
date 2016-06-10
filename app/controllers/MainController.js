"use strict";

MusicHistory.controller('MainController', [
	'$http', 
	'$scope',
	'AuthFactory',

	function ($http, $scope, AuthFactory) {

		$scope.tracks = [];
		$scope.user = AuthFactory.getUser();

		$http
			.get('http://localhost:5000/api/Tracks')
			.success(inv => $scope.tracks = inv);

		$scope.deleteTrack = function (id) {
			$http({
				method: "DELETE",
				url: `http://localhost:5000/api/Tracks/${id}`
			})
			.then(
				() => console.log("Track deleted"),
				() => console.log("Track not deleted")
			);
		}
	}

]);