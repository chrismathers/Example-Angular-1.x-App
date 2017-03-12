'use strict';

angular.module('myApp.sidebar', [])

    .directive('sidebarContent', function( ) {

        return {
            restrict: 'AEC',
            templateUrl: 'https://chrismathers.github.io/voyanta/app/components/sidebar/sidebar.html',
            link: function(scope, element) {

                scope.cols = ["timestamp", "score"]

                scope.registerClick = function () {
                    element.toggleClass("isShown");
                }

            }
        };
    });

