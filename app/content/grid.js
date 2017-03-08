'use strict';

angular.module('myApp.grid', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/grid', {
            templateUrl: 'content/content.html',
            controller: 'gridCtrl'
        });
    }])

    .controller('gridCtrl', ['$scope', '$http', '$sce', '$location', '$filter', function($scope, $http, $sce, $location, $filter) {

        $scope.onactive = true;
        $scope.offactive = false;
        $scope.selectedTemplate = 'content/grid.html';

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
            for (var i = 0; i < data.length; i++) {
                var value = data[i][key];
                if (result.indexOf(value) == -1) {
                    result.push(value);
                }
            }
            return result;
        };

        $scope.useCategory = {};
        $scope.$sce = $sce;
        $scope.sort = 'timestamp';

        // get articles
        $http.get('/model/data.json').success(function(data) {
            $scope.articles = angular.fromJson(data.articles);
        });

        // get categories
        $http.get('/model/data.json').success(function(data) {
            $scope.categories = angular.fromJson(data.categories);
        });

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

                //$scope.categoryGroup = uniqueItems($scope.categories, 'id');
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
