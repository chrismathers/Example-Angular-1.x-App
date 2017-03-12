'use strict';

angular.module('myApp.grid', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/content/:selectedTemplate', {
            templateUrl: '/app/content/content.html',
            controller: 'gridCtrl'
        })
        $routeProvider.when('/grid', {
            templateUrl: '/app/content/content.html',
            controller: 'gridCtrl'
        })

    }])

    .controller('gridCtrl', ['$scope', '$http', '$sce', '$location', '$routeParams', function($scope, $http, $sce, $location, $routeParams) {

        $scope.useCategory = {};
        $scope.$sce = $sce;
        $scope.sort = 'timestamp';
        $scope.onactive = true;
        $scope.offactive = false;
        $scope.narrowWidth = false;
        /*
        $(window).resize(function(){
            $scope.$apply(function(){
                $scope.narrowWidth = true;
            });
        });*/

        if(!$scope.narrowWidth && $routeParams.selectedTemplate) {
            $scope.selectedTemplate = '/app/content/' + $routeParams.selectedTemplate + '.html';
        }
        $scope.selectedTemplate = $scope.selectedTemplate || '/app/content/list.html';

        // get articles
        $http.get('/model/data.json').success(function(data) {
            $scope.articles = angular.fromJson(data.articles);
        });

        // get categories
        $http.get('/model/data.json').success(function(data) {
            $scope.categories = angular.fromJson(data.categories);
        });

        $scope.changeView = function(button, template) {
            if (button === 'on') {
                $scope.onactive = true;
                $scope.offactive = false;
            } else if (button === 'off') {
                $scope.onactive = false;
                $scope.offactive = true;
            }
            $scope.selectedTemplate = template;
        };


        var uniqueItems = function (data, key) {
            var result = [];
            if(data != null) {
                for (var i = 0; i < data.length; i++) {
                    var value = data[i][key];
                    if (result.indexOf(value) == -1) {
                        result.push(value);
                    }
                }
                return result;
            }
        };

        $scope.goTo = function ( path ) {
            $location.path(path);
        };

        // Watch the categories that are selected
        $scope.$watch(function () {
                return {
                    articles: $scope.articles,
                    useCategory: $scope.useCategory
                }
            },
            function (value) {
                var selected;

                $scope.categoryGroup = uniqueItems($scope.articles, 'category');

                var filterAfterCategory = [];
                selected = false;
                for (var j in $scope.articles) {
                    var p = $scope.articles[j];
                    for (var i in $scope.useCategory) {
                        if ($scope.useCategory[i]) {
                            selected = true;
                            if (i == p.category) {
                                filterAfterCategory.push(p);
                                break;
                            }
                        }
                    }
                }
                if (!selected) {
                    filterAfterCategory = $scope.articles;
                }

                $scope.filteredArticles = filterAfterCategory;
            }, true);
    }]);
