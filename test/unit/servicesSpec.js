'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('citroenInUaApp'));

  // Test service availability
  it('check the existence of Car factory', inject(function(Car) {
      expect(Car).toBeDefined();
    }));
});