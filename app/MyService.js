angular.module('myservice', []).
factory('MyService', function($http) {
    var MyService = {};
    MyService.get = function() {
        //$http.get('/Admin/GetTestAccounts?applicationId=' + applicationId).success(function(data) {
        $http.get('/model/countries.json').success(function(data) {
            $scope.countries = data;
        });
    };
    return MyService;
});