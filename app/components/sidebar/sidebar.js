'use strict';

angular.module('myApp.sidebar', [])

    .controller('sidebarCtrl', ['$scope', '$http',  function($scope, $http) {

        myapp.filter('findobj', function () {
            return function (dataobj, selected) {
                if (!selected) return dataobj;
                return dataobj.filter(function (cats) {
                    return cats.title === selected;
                });
            };
        });
    }])

    .directive('sidebarContent', function( $http, $location, $routeParams ) {

        return {
            restrict: 'AEC',
            templateUrl: '/components/sidebar/sidebar.html',
            link: function(scope, element,attrs) {

                // get categories
                $http.get('/model/data.json').success(function(data) {
                    scope.categories = angular.fromJson(data.categories);
                });

                scope.cols = ["timestamp", "score"]

                scope.goTo = function ( path, routeParams ) {
                    console.log("sidebar routeParams " +routeParams);
                    $location.path(path, routeParams);
                }

                scope.getClass = function (path) {
                    return ($location.path().substr(0, path.length) === path) ? 'selected' : '';
                }

                scope.registerClick = function () {
                    element.toggleClass("isShown");
                }
            }
        };
    });

