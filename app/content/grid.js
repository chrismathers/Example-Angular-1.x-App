'use strict';

angular.module('myApp.grid', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/content/:selectedTemplate', {
            templateUrl: 'content/content.html',
            controller: 'gridCtrl'
        });
        $routeProvider.when('/grid', {
            templateUrl: 'content/content.html',
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

        $scope.item = {
            list: true,
            grid: false
        };

        /*
        $(window).resize(function(){
            $scope.$apply(function(){
                $scope.narrowWidth = true;
            });
        });*/

        if(!$scope.narrowWidth && $routeParams.selectedTemplate) {
            $routeParams.selectedTemplate === 'list' ? $scope.item.list = true : $scope.item.list = false;
            $routeParams.selectedTemplate === 'grid' ? $scope.item.grid = true : $scope.item.grid = false;
            $scope.selectedTemplate = 'content/' + $routeParams.selectedTemplate;
        }
        $scope.selectedTemplate = $scope.selectedTemplate || 'content/list';

        // get articles
        $http.get('model/data.json').success(function(data) {
            $scope.articles = angular.fromJson(data.articles);
        });

        // get categories
        $http.get('model/data.json').success(function(data) {
            $scope.categories = angular.fromJson(data.categories);
        });

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

    }])

    .directive('buttonGrid', function() {
        return {
            scope: true,
            restrict: 'E',
            template: '<button ng-class="{selected: item.list}" class="list"></button>',
                link: function(scope, elem) {
                elem.bind('click', function() {
                    scope.$apply(function(){
                        scope.item.list = !scope.item.list || scope.item.grid;
                        scope.goTo('content/list');
                    });
                });
            }
        };
    })

    .directive('buttonList', function() {
        return {
            scope: true,
            restrict: 'E',
            template: '<button ng-class="{selected: item.grid}" class="grid"></button>',
            link: function(scope, elem) {
                elem.bind('click', function() {
                    scope.$apply(function(){
                        scope.item.grid = !scope.item.grid || scope.item.list;
                        scope.goTo('content/grid');
                    });
                });
            }
        };
    });