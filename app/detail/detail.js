'use strict';

angular.module('myApp.detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail', {
        templateUrl: 'detail/detail.html',
        controller: 'detailCtrl'
    });
}])

.controller('detailCtrl', [function() {

}]);