'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'ExcursionsList'});
  $routeProvider.when('/excursions', {templateUrl: 'partials/excursionsList.html', controller: 'ExcursionsList'});
  $routeProvider.when('/excursion/:id', {templateUrl: 'partials/excursion.html', controller: 'Excursion'});
  $routeProvider.when('/panorama', {templateUrl: 'partials/panorama.html'});
  $routeProvider.otherwise({redirectTo: '/home'});
}])
