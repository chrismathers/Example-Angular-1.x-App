'use strict';

angular.module('myApp.sidebar', [])

    .controller('sidebarCtrl', ['$scope', '$http',  function($scope, $http) {

    }])

    .directive('sidebarContent', function( $http, $location, $routeParams ) {

        return {
            restrict: 'AEC',
            templateUrl: '/components/sidebar/sidebar.html',
            link: function(scope, element,attrs) {

                scope.cols = ["timestamp", "score"]

                scope.registerClick = function () {
                    element.toggleClass("isShown");
                }
            }
        };
    });

