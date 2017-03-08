'use strict';

angular.module('myApp.detail', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail/:articleId', {
            controller: 'detailCtrl',
            templateUrl: function(articleId){ console.log('params ' +articleId); return 'detail/detail.html' }
        });
    }])

    .controller('detailCtrl', ['$route', '$http', '$scope', '$routeParams', '$sce', function($route, $http, $scope, $routeParams, $sce) {

        $scope.$sce = $sce;
        $scope.articleId = $routeParams.articleId;

        // get articles
        $http.get('/model/data.json').success(function(data) {
            $scope.articles = angular.fromJson(data.articles);
        });

        // get categories
        $http.get('/model/data.json').success(function(data) {
            $scope.categories = angular.fromJson(data.categories);
        });

        $scope.getArticleCategory = function (catId) {
            var result = [];
            for(var i = 0 ; i < $scope.categories.length ; i++){
                if(catId === $scope.categories[i].id){
                    break;
                }
            }
            return $scope.categories[i].title;
        }
    }])

    .directive('detailContent', function( $http, $location, $routeParams ) {

        return {
            restrict: 'AEC',
            link: function(scope, element,attrs) {
                scope.getArticleCategory = function (catId) {
                    var result = [];
                    for(var i = 0 ; i < $scope.categories.length ; i++){
                        if(catId === $scope.categories[i].catId){
                            result.push($scope.categories[i]);
                        }
                    }
                    return result;
                }

            }
        };
    });
