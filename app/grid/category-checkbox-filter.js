'use strict';

angular.module('myApp.grid.category-checkbox-filter', [])

// Define our filter
.filter('categoryCheckbox', function($filter) {
    return function(categories) {
        var i, len;

        // get customers that have been checked
        var checkedCategories = $filter('filter')(categories, {checked: true});

        // Add in a check to see if any customers were selected. If none, return
        // them all without filters
        if(checkedCategories.length == 0) {
            return categories;
        }

        // get all the unique cities that come from these checked customers
        var titles = {};
        for(i = 0, len = checkedCategories.length; i < len; ++i) {
            // if this checked customers cities isn't already in the cities object
            // add it
            if(!titles.hasOwnProperty(checkedCategories[i].title)) {
                titles[checkedCategories[i].title] = true;
            }
        }

        // Now that we have the cities that come from the checked customers, we can
        //get all customers from those cities and return them
        var ret = [];
        for(i = 0, len = categories.length; i < len; ++i) {
            // If this customer's city exists in the cities object, add it to the
            // return array
            if(titles[categories[i].title]) {
                ret.push(categories[i]);
            }
        }

        // we have our result!
        return ret;
    };
});
