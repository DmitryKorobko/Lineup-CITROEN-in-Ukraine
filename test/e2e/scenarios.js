'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('CitroenInUa App', function() {

  it('should redirect index.html to index.html#/cars', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/cars');
      });
  });


  describe('Car list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/cars');
    });


    it('should filter the car list as a user types into the search box', function() {

      var carList = element.all(by.repeater('car in cars'));
      var query = element(by.model('query'));

      expect(carList.count()).toBe(20);

      query.sendKeys('citroen');
      expect(carList.count()).toBe(1);

      query.clear();
      query.sendKeys('ds4');
      expect(carList.count()).toBe(8);
    });


    it('should be possible to control car order via the drop down select box', function() {

      var carNameColumn = element.all(by.repeater('car in cars').column('car.name'));
      var query = element(by.model('query'));

      function getNames() {
        return carNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('c4'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Citroen C4",
        "CITROEN C"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "CITROEN C",
        "Citroen C4"
      ]);
    });


    it('should render car specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('citroen');
      element.all(by.css('.cars li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/cars/CITROEN_C4');
      });
    });
  });


  describe('Car detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/cars/CITROEN_C4');
    });


    it('should display CITROEN C4 page', function() {
      expect(element(by.binding('car.name')).getText()).toBe('CITROEN C4');
    });


    it('should display the first car image as the main car image', function() {
      expect(element(by.css('img.car')).getAttribute('src')).toMatch(/img\/cars\/CITROEN_C4.1.jpg/);
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.car-thumbs li:nth-child(3) img')).click();
      expect(element(by.css('img.car')).getAttribute('src')).toMatch(/img\/cars\/CITROEN_C4.2.jpg/);

      element(by.css('.car-thumbs li:nth-child(1) img')).click();
      expect(element(by.css('img.car')).getAttribute('src')).toMatch(/img\/cars\/CITROEN_C4.1.jpg/);
    });
  });
});
