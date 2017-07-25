describe('Factory : productFactory', function(){
    var productFactory;
    var $httpBackend;
    var $http;
    beforeEach(function(){
        module('TradeTrackerFeederApp');
        inject( function($injector){
            $httpBackend = $injector.get('$httpBackend');
            $http = $injector.get('$http');
            productFactory = $injector.get('productFactory');
        });
    });
    it('should call http service', function(){        

        $httpBackend.when('data/productfeed.xml').respond(200);
        var success;

        productFactory.get().then(function () {
            success = true;
        });

        $httpBackend.flush();
        // verification
        expect(success).toBe(true);
        });
});