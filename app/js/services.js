'use strict';

/* Services */

var citroenInUaAppServices = angular.module('citroenInUaAppServices', ['ngResource']);

citroenInUaAppServices.factory('Car', ['$resource',
  function($resource){
    return $resource('cars/:carId.json', {}, {
      query: {method:'GET', params:{carId:'cars'}, isArray:true}
    });
  }]);
