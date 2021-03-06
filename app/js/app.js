'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'ui.bootstrap',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'ExcursionsList'});
  $routeProvider.when('/excursions', {templateUrl: 'partials/excursionsList.html', controller: 'ExcursionsList'});
  $routeProvider.when('/excursion/:id', {templateUrl: 'partials/excursion.html', controller: 'Excursion'});
  $routeProvider.when('/panorama', {templateUrl: 'partials/panorama.html'});
  $routeProvider.otherwise({redirectTo: '/home'});
}])
