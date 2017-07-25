'use strict';

/**
 * @ngdoc overview
 * @name TradeTrackerFeederApp
 * @description
 * # TradeTrackerFeederApp
 *
 * Main module of the application.
 */
angular
  .module('TradeTrackerFeederApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngMaterial',
    'productService',
    'productFactory',
    'productCategory'
  ])
 
  .config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider

    .state('home', {
      url : '/home',
      views : {
        'content@' : {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
        }
      }
    })
    .state('product', {
      url : '/product',
      params: {
            productID: null
      },
      views : {
        'content@' : {
          templateUrl: 'views/product.html',
          controller: 'ProductDetailsCtrl',
        }
      }
    })
  });
