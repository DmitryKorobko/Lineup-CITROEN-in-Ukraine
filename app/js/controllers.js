'use strict';

/* Controllers */

var citroenInUaAppControllers = angular.module('citroenInUaAppControllers', []);

citroenInUaAppControllers.controller('CarListControl', ['$scope', 'Car',
  function($scope, Car) {
    $scope.cars = Car.query();
    $scope.orderProp = 'name';
  }]);

citroenInUaAppControllers.controller('CarTechParamControl', ['$scope', '$routeParams', 'Car',
  function($scope, $routeParams, Car) {
    $scope.car = Car.get({carId: $routeParams.carId}, function(car) {
      $scope.mainImageUrl = car.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);
