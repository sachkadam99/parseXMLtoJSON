'use strict';

describe('Directives: MainCtrl', function () {

  var scope;
  var productServiceMock;
  var MainCtrl;

  // load the controller's module
  beforeEach(module('TradeTrackerFeederApp'));

  beforeEach(function() {
        productServiceMock = {
            getStroredData: function() {},
            getProductsFromURL : function(){}
       };

       spyOn(productServiceMock, 'getStroredData').and.returnValue({"id":"test_product","name":"Apple iphone 6S Plus"});
       
       
   });

   // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      productService : productServiceMock
    });
  }));

  it('should call productServiceMock.getStroredData() once', function() {
    expect(productServiceMock.getStroredData).toHaveBeenCalled();
    expect(productServiceMock.getStroredData.calls.count()).toEqual(1);
  });

  it('should attach products to the scope', function() {
    expect(scope.products.id).toEqual('test_product');
  });

  /*it('should call productServiceMock.getProductsFromURL() once', function() {
    spyOn(productServiceMock, 'getProductsFromURL').and.returnValue({"id":"test_product1","name":"hp laptop"});
    expect(productServiceMock.getProductsFromURL).toHaveBeenCalled();
    expect(productServiceMock.getProductsFromURL.calls.count()).toEqual(1);
    expect(scope.products.id).toEqual('test_product1');
  });*/
});
