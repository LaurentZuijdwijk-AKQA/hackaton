'use strict';

var TYPES = ['adventurous', 'fun', 'relaxing', 'suprising', 'romantic'];
var PRICES = [
	{name: 'free', min: null, max:0},
	{name: '£', min: 0, max:40},
	{name: '££', min: 40, max:80},
	{name: '£££', min: 80, max:null},
	{name: 'any amount', min: null, max:null}
];

/* Controllers */
function filterType($routeParams, data){
	if($routeParams['type']){
		var _data = [];
		for(var i = 0 ; i < data.length; i++){
			var ref = data[i];
			if(ref.type) ref.type.search($routeParams['type'])
			if(ref.type && ref.type.search($routeParams['type']) > -1){
				_data.push(ref);
			}
		}
		data = _data;

	}
	return data;
}


function filterPrice($routeParams, data){
	if(!Array.isArray(data)){
		return data;
	}
	$routeParams.price = $routeParams.price ? $routeParams.price : 4;
	var min = PRICES[$routeParams.price].min;
	var max = PRICES[$routeParams.price].max;
	if(min &&  min != "null" && max && max != "null"){ 
		var _data = [];
		for(var i = 0 ; i < data.length; i++){
			var ref = data[i];
			if(ref.AdultPrice <= Number(max)  && ref.AdultPrice > Number(min)){
				_data.push(ref);
			}
		}
		data = _data;
	}
	else if(min && min != "null"){
		var _data = [];
		for(var i = 0 ; i < data.length; i++){
			var ref = data[i];
			if(ref.AdultPrice > Number(min)){
				_data.push(ref);
			}
		}
		data = _data;
	}
	else if(max || max === 0){
		var _data = [];
		for(var i = 0; i < data.length; i++){
			var ref = data[i];
			if(ref.AdultPrice <= Number(max)){
				_data.push(ref);
			}
		}
		data = _data;
	}
	return data;
}


angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('ExcursionsList', ['$scope','$routeParams', function($scope,$routeParams) {
	$.getJSON('data.js', function(data){
		data = filterPrice($routeParams, data);
		data = filterType($routeParams, data);
		$scope.excursions = data;
		
		$scope.weather = {}
		$scope.weather.max = 30
		$scope.weather.min = 20
		$scope.weather.wind = 7
		$scope.weather.water = 20

		$scope.$apply();

	});
  }])

  .controller('Excursion', ['$scope','$routeParams', function($scope,$routeParams) {
	$scope.show = false;

	$.getJSON('data.js', function(data){
		$scope.show = true;
		$scope.excursion = data[$routeParams.id];
		$scope.$apply();
	});
  }])

  .controller('ExcursionSelect', ['$scope','$routeParams','$location', '$route', function($scope,$routeParams, $location, $route) {
	var priceIndex = parseInt($routeParams['price']) || parseInt($routeParams['price']) ===0 ? parseInt($routeParams['price']) : 4;

	$scope.price = PRICES[priceIndex]

	$scope.type = $routeParams['type'] ? $routeParams['type'] : 'adventurous'

	$scope.priceClick = function(min, max){
		priceIndex = (priceIndex+1 >= PRICES.length) ? 0 : priceIndex+1;
		$scope.price = PRICES[priceIndex];
		$routeParams['price'] = priceIndex;
		$location.url('/excursions?'+ qs($routeParams))
	}
	$scope.typeClick = function(type){
		var typeIndex = TYPES.indexOf($scope.type);
		typeIndex = (typeIndex+1 >= TYPES.length) ? 0 : typeIndex+1;
		$scope.type = TYPES[typeIndex];

		$routeParams['type'] = $scope.type;
		$location.url('/excursions?'+ qs($routeParams))
	} 
  }]);





var qs = function(obj, prefix){
  var str = [];
  for (var p in obj) {
	var k = prefix ? prefix + "[" + p + "]" : p, 
		v = obj[k];
	str.push(angular.isObject(v) ? qs(v, k) : (k) + "=" + encodeURIComponent(v));
  }
  return str.join("&");
}
