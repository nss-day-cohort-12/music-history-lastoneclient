"use strict";

MusicHistory.controller('RegisterController', [
	'$http', 
	'$scope',
	'AuthFactory',

	function ($http, $scope, authFactory) {

		$scope.githubOauth = function () {
			OAuth.initialize('pNuuqfq7FGghJRlx3D3HnEMEFo4')
			
			OAuth.popup('github').done(function(result) {
			    console.log(result)

				result.me().done(function(data) {
				    // do something with `data`, e.g. print data.name
				    console.log(data);

				    $http({
				    	url: "http://localhost:5000/api/Geek",
				    	method: "POST",
				    	data: JSON.stringify({
				    		username: data.alias,
				    		location: data.location,
				    		emailAddress: data.email,
				    		createdDate: new Date()
				    	})
				    }).then(
				    response => {
				    	let theGeek = response.data[0];
				    	authFactory.setUser(theGeek);
				    	console.log("resolve fired", theGeek);
				    },
				    response => {
				    	console.log("reject fired", response);

				    	// Geek has already been created
				    	if (response.status === 409) {
				    		$http
				    			.get(`http://localhost:5000/api/Geek?username=${data.alias}`)
				    			.then(
				    				response => {
				    					let theGeek = response.data[0];
				    					console.log("Found the Geek", theGeek);
				    					authFactory.setUser(theGeek)
				    				},
				    				response => console.log("Could not find that Geek", response)
				    			)
				    	}

				    }
				    )
				})
			});
		};
	}
]);

