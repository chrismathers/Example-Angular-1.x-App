'use strict';

angular.module('myApp.detail', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail', {
            templateUrl: 'detail/detail.html',
            controller: 'detailCtrl'
        });
    }])

    .controller('detailCtrl', ['$route', '$http', '$scope', '$routeParams', '$sce', function($route, $http, $scope, $routeParams, $sce) {

        $scope.$sce = $sce;

        var paramValue = $route.current.$$route.routeParams;
        console.log("paramValue = " +paramValue);

        $http.get('/model/data.json').success(function(data) {
            $scope.articles = angular.fromJson(data.articles);
        });

    }])

    .directive('detailContent', function( $http, $location, $routeParams ) {

        return {
            restrict: 'AEC',
            //templateUrl: '/components/sidebar/sidebar.html',
            link: function(scope, element,attrs) {
/*
                scope.goTo = function ( path, routeParams ) {
                    console.log("routeParams " +routeParams);
                    $location.path(path, routeParams);
                }*/
            }
        };
    });
