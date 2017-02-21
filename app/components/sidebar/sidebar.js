'use strict';

angular.module('myApp.sidebar', [])

    .controller('sidebarCtrl', ['$scope', '$http', function($scope, $http) {

        myapp.filter('findobj', function () {
            return function (dataobj, selected) {
                if (!selected) return dataobj;
                return dataobj.filter(function (cats) {
                    return cats.title === selected;
                    /*return cats.CategoryList.some(function (category) {
                        return category.DisplayName === selected;
                    });*/
                });
            };
        });
    }])

    .directive('sidebarContent', function( $http ) {

        return {
            restrict: 'AEC',
            templateUrl: '/components/sidebar/sidebar.html',
            link: function(scope, cats, element,attrs) {

                // get categories
                $http.get('/model/data.json').success(function(data) {
                    scope.categories = angular.fromJson(data.categories);
                });

                scope.cols = ["timestamp", "score"]

            }
        };
    });

