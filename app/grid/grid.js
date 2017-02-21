'use strict';

/*angular.module('myApp.grid', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/grid', {
    templateUrl: 'grid/grid.html',
    controller: 'gridCtrl'
  });
}])

.controller('gridCtrl', [function() {
    var vm = this;
    vm.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    }
    vm.$onInit = function () {
      console.log('stuff happens ' + vm.customer.name);
    };
}])
.directive('myCustomer', function() {
    return {
        templateUrl: 'grid/grid-content.html'
    };
});*/

angular.module('myApp.grid', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/grid', {
            templateUrl: 'grid/grid.html',
            controller: 'gridCtrl'
        });
    }])

    .controller('gridCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce, myService) {
        $scope.$sce = $sce;

        // get articles
        $http.get('/model/data.json').success(function(data) {
            $scope.articles = angular.fromJson(data.articles);
        });

        /*// get categories
        $http.get('/model/data.json').success(function(data) {
            $scope.categories = angular.fromJson(data.categories);
        });*/

/*        $scope.propertyName = 'population';
        $scope.reverse = true;

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };*/
    }])

    /*.directive('gridContent', function() {
        return {
            templateUrl: 'grid/grid-content.html'
        };
    });*/
