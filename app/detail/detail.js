'use strict';

angular.module('myApp.detail', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail/:articleId/:selectedTemplate', {
            controller: 'detailCtrl',
            templateUrl: 'detail/detail.html'
        });
    }])

    .controller('detailCtrl', ['$route', '$http', '$scope', '$routeParams', '$sce', '$location', function($route, $http, $scope, $routeParams, $sce, $location) {

        $scope.$sce = $sce;
        $scope.articleId = $routeParams.articleId;
        $scope.selectedTemplate = $routeParams.selectedTemplate;

        // get articles
        $http.get('../model/data.json').success(function(data) {
            $scope.articles = angular.fromJson(data.articles);
        });

        // get categories
        $http.get('./model/data.json').success(function(data) {
            $scope.categories = angular.fromJson(data.categories);
        });

        $scope.getArticleCategory = function (catId) {
            var result = [];
            if($scope.categories != null) {
                for(var i = 0 ; i < $scope.categories.length ; i++){
                    if(catId === $scope.categories[i].id){
                        break;
                    }
                }
                return $scope.categories[i].title;
            }
        }


        //$scope.selectedTemplate = 'content/list.html';
        $scope.changeView = function(template) {
            template = '/content/' + $scope.selectedTemplate;
            $location.path(template);
        };
    }])

    .directive('linkBack', function() {

        return {
            restrict: 'E',
            link: function(scope, element,attrs) {
                scope.goTo = function ( path ) {
                    $location.path(path);
                };
            }
        };
    });
