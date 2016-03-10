var filteringModule = angular.module('quickGoFeApp.FilteringModule', []);

filteringModule.factory('filteringService', function() {

  var filteringService = {};
  var filters = [];


  filteringService.setFilters = function (filterList){
    filters = filterList;
  }

  filteringService.getFilters = function(){
    return filters;
  }

  filteringService.populateAppliedFilters = function(data){
    angular.forEach(data, function(filter, type){
      if(typeof(filter) === 'string') {
        if(type === 'ecoTermUse'){
          if(hasItems(data.ecoID)) {
            filteringService.saveAppliedFilter({type: type, value:filter});
          }
        } else if (type === 'goTermUse') {
          if(hasItems(data.goID)) {
            filteringService.saveAppliedFilter({type: type, value:filter});
          }
        } else if (type === 'goRelations') {
          if(hasItems(data.goID)) {
            filteringService.saveAppliedFilter({type: type, value:filter});
          }
        }
      } else {
        angular.forEach(filter, function(add, id){
          if(add) {
            filteringService.saveAppliedFilter({type: type, value:id});
          }
        });
      }
    });
  }

  var hasItems = function(terms) {
    return _.find(_.values( terms ), function(val){
      return val;
    });
  }

  filteringService.saveAppliedFilter = function(aFilter){
    filters.push(aFilter);
  }

  filteringService.validateGOTerm = function(term) {
      return term.match(/^GO:\d{7}$/);
  }

  filteringService.validateECOTerm = function(ev) {
      return ev.match(/^ECO:\d{7}$/);
  }

  filteringService.validateGeneProduct = function(id) {
    var matches = (id.match(/^([OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z]([0-9][A-Z][A-Z0-9]{2}){1,2}[0-9])((-[0-9]+)|:PRO_[0-9]{10}|:VAR_[0-9]{6}){0,1}$/)
    || id.match(/^EBI-[0-9]+$/)
    || id.match(/^URS[0-9A-F]{10}(_[0-9]+){0,1}$/));
    return matches;
  }

  // filteringService.validateReference = function(value) {
  //     if(upperCase=='DOI*' || upperCase=='GO_REF*' || upperCase=='PMID*' || upperCase=='Reactome*'){
  //     }
  //     // Otherwise we should have a GO:REF
  //     var niceContent = upperCase.match(/^GO_REF:\d{7}$/);
  // }

  filteringService.validateTaxon = function(taxon){
       return taxon.match(/^[0-9]+$/);
  }

  filteringService.validateOther = function(other){
      return other.match(/[A-Za-z0-9]+/);
  }

  /**
  * Clear all filters
  */
  filteringService.clearFilters=function(){
    filters = [];
  };




  /**
  * Save the object to applied filters if it doesn't exist already
  */
  filteringService.saveValuesAsFilter=function(filtertype, aFilterValue) {

    var aFilter = {type: filtertype, value: aFilterValue};
    this.saveAppliedFilter(aFilter);
  }

  return filteringService;
});
