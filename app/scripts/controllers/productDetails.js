'use strict';

/**
 * @ngdoc function
 * @name TradeTrackerFeederApp.controller:ProductDetailsCtrl
 * @description
 * # ProductDetailsCtrl
 * Controller of the TradeTrackerFeederApp
 */
angular.module('TradeTrackerFeederApp')
  .controller('ProductDetailsCtrl', function ($scope,productService,$state,$stateParams) {

    if(!$stateParams.productID) {
       $state.go('home');
    } 	

  	$scope.product = productService.getProductByID($stateParams.productID);
  	
  });

