"use strict";

MusicHistory.controller('MainController', [
	'$http', 
	'$scope',

	function ($http, $scope) {

		$scope.figurines = [];

		$http
			.get('http://localhost:5000/api/Inventory')
			.success(inv => $scope.figurines = inv);

		$scope.deleteToy = function (id) {
			$http({
				method: "DELETE",
				url: `http://localhost:5000/api/Inventory/${id}`
			})
			.then(
				() => console.log("Toy deleted"),
				() => console.log("Toy not deleted")
			);
		}
	}

]);