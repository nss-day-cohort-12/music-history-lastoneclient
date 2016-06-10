"use strict";

MusicHistory.controller('RegisterController', [
	'$http', 
	'$scope',
	'AuthFactory',
	'$location',

	function ($http, $scope, authFactory, $location) {

		$scope.githubOauth = function () {
			OAuth.initialize('pNuuqfq7FGghJRlx3D3HnEMEFo4')
			
			OAuth.popup('github').done(function(result) {
			    console.log(result)

				result.me().done(function(data) {
				    // do something with `data`, e.g. print data.name
				    console.log(data);

				    $http({
				    	url: "http://localhost:5000/api/LastOneUsers",
				    	method: "POST",
				    	data: JSON.stringify({
				    		Username: data.alias,
				    		Email: data.email
				    	})
				    }).then(
				    response => {
				    	let theGeek = response.data[0];
				    	authFactory.setUser(theUser);
				    	console.log("resolve fired", theUser);
				    	$location.path("/");
				    },
				    response => {
				    	console.log("reject fired", response);

				    	// Geek has already been created
				    	if (response.status === 409) {
				    		$http
				    			.get(`http://localhost:5000/api/LastOneUsers?username=${data.alias}`)
				    			.then(
				    				response => {
				    					let theUser = response.data[0];
				    					console.log("Found the User", theUser);
				    					authFactory.setUser(theUser);
				    					$location.path("/");
				    				},
				    				response => console.log("Could not find that User", response)
				    			)
				    	}

				    }
				    )
				})
			});
		};
	}
]);

