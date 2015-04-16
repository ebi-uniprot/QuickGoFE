/**
 * Created by twardell on 09/03/2015.
 *
 * This service is the repository of parameters for filtering on the annotation list page.
 * The contents are a list of things by which the annotation page is being  filtered.
 * The inputs from this service are the sidebar on the annotation page itself, or the 'Advanced Filtering' modal
 * available from the annotation list page.
 * The annotation list controller and statistics controller  should make a call to this service before it does anything
 * to find out what filters have been specified.
 *
 * This service will hold a list of records with 3 attributes
 * TYPE: this corresponds to the tab heading on the advanced filtering modal
 * KEY:  the checkbox or text name etc
 * VALUE: true, id and so on to identify the filtering value.
 */


var filteringModule = angular.module('quickGoFeApp.FilteringModule', []);

filteringModule.factory('filteringService', function() {

  var filteringService = {};
  var filters = {};


  filteringService.setFilters = function (filterList){
    filters=filterList;
    console.log("Creating filters list", filters)
  }

  filteringService.getFilters = function(){
    return filters;
  }

  /**
   * Create
   */
  filteringService.toQueryString = function(){
    console.log("Building Query String", filters);

    var queryString = '';
    if(filters.dbObjectID != undefined) {
      queryString = queryString + filters.dbObjectID;
    }
  }

  return filteringService;
});
