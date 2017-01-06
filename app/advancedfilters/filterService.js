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
    var duplicateIds = _.intersection(_.pluck(array1,'id'),_.pluck(array2,'id'));
    if(duplicateIds) {
      //TODO we need to merge the objects
      var concat = array1.concat(array2);
      _.map(concat, function(d){
        if(_.contains(duplicateIds,d.id)) {
          d.checked = true;
          return d;
        }
      });
      return _.uniq(concat, function(d){
        return d.id;
      });
    } else {
      return array1.concat(array2);
    }
  };

});
