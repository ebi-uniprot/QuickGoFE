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

  this.validateItems = function(items, validator, modify) {
    var filterItems = {};
    var invalidItems = [];
    angular.forEach(items, function (item) {
      var validation = validator(item);
      if (validation) {
        filterItems[modify ? validation : item] = {
          id: modify ? validation : item,
          checked: true
        };
      } else {
        invalidItems.push(item);
      }
    });
    return {validItems: _.values(filterItems), invalidItems: invalidItems};
  };

  this.getPresetFilterItems = function(items, idField, checked) {
    checked = checked ? checked : false;
    var filterItems = [];
    angular.forEach(items, function(item) {
      filterItems.push({
        id: item[idField],
        item: item,
        checked: checked
      });
    });
    return filterItems;
  };

  this.getFilterItemsForIds = function(ids) {
    var filterItems = [];
    angular.forEach(ids, function(id) {
      filterItems.push({
        id: id,
        checked: false
      });
    });
    return filterItems;
  };

  this.enrichFilterItemObject = function(filterItems, data, id) {
    var filterMap = _.indexBy(filterItems,'id');
    angular.forEach(data, function(item) {
      filterMap[item[id]].item = item;
    });
  };

  this.mergeArrays = function(dst, src) {
    var concat = dst.slice(); //copy the array
    var dstMap = _.indexBy(dst,'id');
    angular.forEach(src, function(item) {
      if(dstMap[item.id]) {
        dstMap[item.id].checked = item.checked;
        dstMap[item.id].item = (item.item) ? item.item : dstMap[item.id].item;
      } else {
        concat.push(item);
      }
    });
    return _.sortBy(concat, 'checked').reverse();
  };

  this.removeRootTerms = function(items) {
    var rootTerms = ['GO:0003674','GO:0008150','GO:0005575'];
    return _.filter(items, function(d){
      return !_.contains(rootTerms, d.id);
    });
  };

});
