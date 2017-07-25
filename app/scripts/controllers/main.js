'use strict';

/**
 * @ngdoc function
 * @name TradeTrackerFeederApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the TradeTrackerFeederApp
 */
angular.module('TradeTrackerFeederApp')
  .controller('MainCtrl', function ($scope,productService) {
  	
  	$scope.products = productService.getStroredData();

  	$scope.order = '';  	

  	$scope.getURLFeedProducts = function( url ){
  		if(undefined == url || null == url || '' == url) {
  			return false;
  		}
  		$scope.products  = productService.getProductsFromURL( url );  
  	};


    var container = angular.element(document);
	container.on('scroll', function() {
	    if (container.scrollTop() > 20) {
	        angular.element('.md-button.md-fab').css('display','block');
	    } else {
	        angular.element('.md-button.md-fab').css('display','none');
	    }
	});

	$scope.scrollToTop = function() {
		$('html,body').animate({
			scrollTop: 0
		});
	}

});
