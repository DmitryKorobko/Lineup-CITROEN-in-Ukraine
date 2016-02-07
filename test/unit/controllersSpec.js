'use strict';

/* jasmine specs for controllers go here */
describe('CitroenInUaApp controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('citroenInUaApp'));
  beforeEach(module('citroenInUaAppServices'));

  describe('CarListControl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('cars/cars.json').
          respond([{name: 'CITROEN C4'}, {name: 'CITROEN C4 CACTUS'}]);

      scope = $rootScope.$new();
      ctrl = $controller('CarListControl', {$scope: scope});
    }));


    it('should create "cars" model with 2 cars fetched from xhr', function() {
      expect(scope.cars).toEqualData([]);
      $httpBackend.flush();

      expect(scope.cars).toEqualData(
          [{name: 'CITROEN C4'}, {name: 'CITROEN C4 CACTUS'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('name');
    });
  });


  describe('CarTechParamControl', function(){
    var scope, $httpBackend, ctrl,
        xyzCarData = function() {
          return {
            name: 'car xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('cars/xyz.json').respond(xyzCarData());

      $routeParams.carId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('CarTechParamControl', {$scope: scope});
    }));


    it('should fetch car detail', function() {
      expect(scope.car).toEqualData({});
      $httpBackend.flush();

      expect(scope.car).toEqualData(xyzCarData());
    });
  });
});
