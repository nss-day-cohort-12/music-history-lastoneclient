"use strict";

let MusicHistory = angular.module('MusicHistory', [
	'ngRoute'
]);

MusicHistory.config(['$routeProvider', 
  function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/main.html',
			controller: 'MainController'
		})
		.when('/create', {
			templateUrl: 'partials/newFigurine.html',
			controller: 'NewFigurineController'
		})
		.when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'RegisterController'
		})
		.otherwise('/');
  }
]);