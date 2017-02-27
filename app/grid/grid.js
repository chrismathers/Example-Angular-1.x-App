'use strict';

angular.module('myApp.grid', ['ngRoute', 'myApp.grid.category-checkbox-filter', 'myApp.grid.cat-check-filter'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/grid', {
            templateUrl: 'grid/content.html',
            controller: 'gridCtrl'
        });
    }])

    .controller('gridCtrl', ['$scope', '$http', '$sce', '$location', '$filter', function($scope, $http, $sce, $location, $filter, myService) {

        $scope.name = 'grid';
        $scope.templates=[
            {
                name:'grid',
                url:'grid/grid.html'
            }
            ,{
                name:'list',
                url:'grid/list.html'
            }
        ]

        $scope.selectedTemplate = $scope.templates[0].url;
        $scope.selectTemplate = function(template){
            $scope.tclass = ($scope.selectedTemplate.name === $scope.templates.name) ? ' selected' : '';
            $scope.selectedTemplate = template.url;
        }


        var uniqueItems = function (data, key) {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var value = data[i][key];
                if (result.indexOf(value) == -1) {
                    result.push(value);
                }
            }
            return result;
        }

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
            console.log("grid path " +path);
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
