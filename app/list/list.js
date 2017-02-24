'use strict';

angular.module('myApp.list', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/list', {
        templateUrl: 'list/list.html',
        controller: 'listCtrl'
      });
    }])

    .controller('listCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

        $scope.$sce = $sce;

        // get articles
        $http.get('/model/data.json').success(function(data) {
            $scope.articles = angular.fromJson(data.articles);
        });

    }]);