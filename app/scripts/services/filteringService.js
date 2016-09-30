'use strict';

var filteringModule = angular.module('quickGoFeApp.FilteringModule', []);

filteringModule.factory('filteringService', function(hardCodedDataService, withDBs, assignDBs, basketService) {

  var filteringService = {
    
  }

  /**
  * Clear all filters
  */
  filteringService.clearFilters=function(){
    //TODO
  };

  filteringService.hasSlims = function() {
    //TODO
  };


  return filteringService;
});
