'use strict';

app.service('filterService', function(){

  this.getQueryFilterItems = function(query) {
    var filterItems = [];
    if(query) {
      angular.forEach(query.split(','), function(value) {
        filterItems.push({
          id: value,
          checked: true
        });
      });
    }
    return filterItems;
  };

  this.addFilterItems = function(items, validator) {
    var filterItems = [];
    angular.forEach(items, function (item) {
      if (validator(item)) {
        filterItems.push({
          id: item,
          checked: true
        });
      }
    });
    return filterItems;
  };

  this.getPresetFilterItems = function(items, idField) {
    var filterItems = [];
    angular.forEach(items, function(item) {
      filterItems.push({
        id: item[idField],
        item: item,
        checked: false
      });
    });
    return filterItems;
  };

  this.concatUniqueAsChecked = function(array1, array2) {
    var concat = array1; //copy the array
    var map1 = _.indexBy(array1,'id');
    angular.forEach(array2, function(item) {
      if(map1[item.id]) {
        map1[item.id].item = item.item;
      } else {
        concat.push(item);
      }
    });
    return concat;
  };

});
