'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.grid',
  'myApp.list',
  'myApp.detail',
  'myApp.version',
  'myApp.sidebar',
  'myApp.truncate'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
/*      .when('/details', {
          templateUrl: '/details',
          controller: 'detailsCtrl',
          routeParams: 'blah'
      })*/
      .otherwise({ redirectTo: '/' });

  $routeProvider.otherwise({redirectTo: '/grid'});
}]);
