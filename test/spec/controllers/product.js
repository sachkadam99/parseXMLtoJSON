'use strict';

describe('Controller: ProductDetailsCtrl', function () {

    var scope;
    var productServiceMock;
    var ProductDetailsCtrl;

  // load the controller's module
  beforeEach(module('TradeTrackerFeederApp'));

  beforeEach(function() {
        productServiceMock = {
            getProductByID: function() {}
       };

       spyOn(productServiceMock, 'getProductByID').and.returnValue({"id":"apple_iphone","name":"Apple iphone 6S Plus"});
       
   });

   // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductDetailsCtrl = $controller('ProductDetailsCtrl', {
      $scope: scope,
      productService : productServiceMock
    });
  }));

  it('should call productServiceMock.getProductByID() once', function() {
    expect(productServiceMock.getProductByID).toHaveBeenCalled();
    expect(productServiceMock.getProductByID.calls.count()).toEqual(1);
  });

  it('should attach product to the scope', function() {
    expect(scope.product.id).toEqual('apple_iphone');
  }); 
});
