'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'list/list.html',
    controller: 'listCtrl'
  });
}])

    .controller('listCtrl', ['$scope', '$http', function($scope, $http, myService) {

        $http.get('/model/countries.json').success(function(data) {
            $scope.countries = data;
        });

        $scope.propertyName = 'population';
        $scope.reverse = true;

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
    }])