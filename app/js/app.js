'use strict';

/* App Module */

var citroenInUaApp = angular.module('citroenInUaApp', [
  'ngRoute',
  'citroenInUaAppControllers',
  'citroenInUaAppFilters',
  'citroenInUaAppServices'
]);

citroenInUaApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/cars', {
        templateUrl: 'partials/car_list.html',
        controller: 'CarListControl'
      }).
      when('/cars/:carId', {
        templateUrl: 'partials/car_tech_param.html',
        controller: 'CarTechParamControl'
      }).
      otherwise({
        redirectTo: '/cars'
      });
  }]);
