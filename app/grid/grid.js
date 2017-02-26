'use strict';

angular.module('myApp.grid', ['ngRoute', 'myApp.grid.category-checkbox-filter', 'myApp.grid.cat-check-filter'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/grid', {
            templateUrl: 'grid/content.html',
            controller: 'gridCtrl'
        });
    }])

    .controller('gridCtrl', ['$scope', '$http', '$sce', '$location', '$filter', function($scope, $http, $sce, $location, $filter, myService) {


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

        $scope.grid = true;
        $scope.list = true;

        $scope.togglegrid = function() {
            $scope.grid = !$scope.grid
            $scope.list = true;
        }
        $scope.togglelist = function() {
            $scope.list = !$scope.list
            $scope.grid = true;
        }


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

/*        $scope.findCat = function ( catId ) {
            for(var i=0; i<$scope.articles.length; i++) {
                if ($scope.articles[i].category === $scope.ShowSelected()) {
                    return true;
                }
            }
        }*/;

        $scope.cats = [];
        $scope.getCats = function(categories) {
            var i, len;

            // get categories that have been checked
            var checkedCategories = $filter('filter')($scope.categories, {checked: true});

            // Add in a check to see if any categories were selected. If none, return
            // them all without filters
            if (angular.isUndefined(categories)) {
                return categories;
            }

            if(checkedCategories) {
                for(i = 0, len = checkedCategories.length; i < len; ++i) {
                    console.log("cats " + checkedCategories[i]);
                    $scope.cats.push(checkedCategories[i]);
                }
            }

            return $scope.cats;
        };

        $scope.getSelectedCategories = function() {
            var allArticles = $scope.articles;
            var selectedArticles = [];
            var categories = $scope.cats;
            var i, x, l, len;
            if (!angular.isUndefined(categories)) {
                for(x = 0, len = allArticles.length; x < len; ++x) {
                    for(i = 0, len = categories.length; i < len; ++i) {
                        if (allArticles[x].category === categories[i].id)
                            console.log("allArticles.category " + allArticles[x].category);
                        selectedArticles.push(allArticles[x]);
                        console.log("selected articles " + selectedArticles[x].title);
                    }
                }
            } else {
                selectedArticles = allArticles;
            }
            for(l = 0, len = selectedArticles.length; l < len; ++l) {
                console.log(selectedArticles[l].title);
            }
            return $scope.articles = selectedArticles;
        };

        /*$scope.articles = [
            { id: 100, category: 1, timestamp: "2014-06-28T09:45:00+01:00", score: 2.3, title: "Eam sale verterem et?", "html": "<p>Fugit commodo aliquam te sea, ne lorem laboramus nam? In eos omnium percipit intellegam, et usu blandit percipitur, cu eum dicant platonem perpetua. Qui saepe equidem iudicabit id, ludus accusata mea at! Id error lobortis mei, no unum legimus debitis ius, ad tempor voluptua pro?</p><p>Vim ea causae delicata? Ea pri clita accusata, vim illud mazim regione ea. Partiendo iudicabit nam at, sed natum hendrerit at. Ad homero aliquam vim. An sit suas salutatus vulputate, diam mollis ne duo.</p><p>Ad vis idque laoreet quaerendum, dolore admodum dissentias eos ei. Duo augue graece posidonium eu. Mutat accumsan eu has. Brute omnes ut duo, et pertinax pertinacia qui. Esse percipitur ne has? Eos an commune oporteat.</p><p>Sea id hinc sonet vulputate, solet nonumy ut qui? Persecuti pertinacia eum cu. Ex epicuri splendide pri! Id mea paulo posidonium, his dicta quaerendum ad. Tacimates tractatos qui eu.</p>" },
            { id: 101, category: 1, timestamp: "2015-05-02T01:48:00+01:00", score: 3.2, title: "Ei soluta integre suscipit sit", "html": "<p>Has propriae noluisse evertitur et, esse sale essent cu vix. Ne his alterum corpora! Nam ea vitae tollit legendos, in nam zril scaevola, ad eam illum altera officiis!</p><p>Quo munere graece facilis id, hinc case intellegebat ei mel! Sit ad timeam laboramus. Per cu audiam suscipit vituperata, et pri novum iuvaret invenire. Cu dolorum consequuntur per, noster persius cu sit? Aeterno utroque ius ad?</p><p>Ea vim quas viris. Sit consulatu mediocritatem ei, ea sit facer ignota atomorum, tale omnis consulatu ea mei. Tota forensibus ullamcorper nec eu, ei mei legere facilis consequuntur. Ferri eripuit placerat ei pri, duo oratio deleniti appetere cu. No erat appetere recusabo mel, at meis singulis elaboraret nec?</p>" },
            { id: 125, category: 2, timestamp: "2015-04-12T22:27:00+01:00", score: 4.0, title: "Clita feugiat at eos, simul oratio admodum eam an", "html": "<p>Eos ne debet luptatum, eos ut feugiat quaestio. Ut nemore singulis usu. Erant primis expetendis ad per, timeam albucius te est, ne his dolorum referrentur. Ullum forensibus percipitur per ei, ex eum porro soluta. At his facete atomorum definitiones, ex mel suas wisi democritum. Tollit placerat has ei.</p><p>Harum nostrum constituam id eam! Populo partiendo ad mei, cum an doming complectitur? Brute delenit nonumes usu an, ea nemore postulant gloriatur eum. Per et quaeque repudiandae efficiantur? Est id zril regione signiferumque, in vis odio detraxit, odio dolorum eloquentiam eu mei. At est essent feugiat expetenda, velit inani tibique vix et, ne quo elit oblique quaerendum. Te eirmod officiis sea, labore saperet oportere ei quo.</p><p>Velit quidam molestie ex eum, eripuit detraxit sit no, id eos porro nullam. Duis dolorem mea in, mel veritus democritum voluptatibus an, te sit elit lobortis. Augue homero appareat has ex, illud viderer persius no mel. Elit deseruisse vel ex, ex per meis aeque complectitur, at pro unum senserit pertinacia. Usu no erat falli nusquam, an pri alia admodum accumsan. Dicit diceret disputationi ea sit, est vidit postulant vituperata ea, mea consul iudicabit ut.</p><p>Ei ludus aperiri vel, vim natum moderatius suscipiantur ut. Iuvaret neglegentur interpretaris sit an, te expetenda gubergren mei. Ei vel dolores inimicus, omnium cetero voluptua qui id. Magna essent patrioque at ius. Illum principes similique in mel!</p><p>In sed falli apeirian praesent! Eu nullam postulant vel. Vis et tollit labores noluisse, qui an eleifend persecuti, prodesset conclusionemque no usu. Ut errem nullam possit nec, ius probatus facilisi suavitate no, quo et possit conceptam!</p>" },
            { id: 134, category: 3, timestamp: "2012-10-20T11:38:00+01:00", score: 1.8, title: "Te duo dicam invidunt cum integre explicari definitiones ad!", "html": "<p>Ad mollis dolorum pri. In purto wisi sit, mei te pertinax electram. Eam meis illud graeci ne. Eum ei propriae consetetur, eu quidam officiis gloriatur duo, eam populo eirmod platonem ei!</p><p>Cu per mentitum urbanitas. Equidem euripidis interesset usu cu, et quem iudicabit deseruisse est? An sea assum percipit salutatus, eos eu vivendum salutatus. Ad etiam vitae repudiandae usu.</p><p>Sit libris percipit ea, eu scripta forensibus repudiandae pro. Sint inermis corpora vis in. Doctus aeterno docendi ne qui! Ne fastidii suavitate duo. Mutat nostrud legimus his ut. In elit fabulas imperdiet vis, ut vix duis atqui dicit.</p>" }
        ]*/

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
