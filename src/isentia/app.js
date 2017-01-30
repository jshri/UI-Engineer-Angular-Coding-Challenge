"use strict";

var isentiaGameApp = angular.module('isentiaGameApp', ['ui.router']);

//route
isentiaGameApp.config(function($stateProvider, $urlRouterProvider){ 
	$stateProvider 
		.state('home', {
			url: '/',
			views : {
				'content': {
				templateUrl: 'src/isentia/mainTemplate.html',
				controller: 'MainController'
				}
			}
		});
		
	$urlRouterProvider.otherwise("/");
})

