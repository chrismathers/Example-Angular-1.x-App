'use strict';

angular.module('myApp.grid', ['ngRoute', 'myApp.grid.category-checkbox-filter'])
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


    }]);
