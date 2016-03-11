var filteringModule = angular.module('quickGoFeApp.FilteringModule', []);

filteringModule.factory('filteringService', function(hardCodedDataService, basketService,
   evidencetypes, withDBs, assignDBs) {

  var filteringService = {};
  var filters = {};
  //Define objects to take values
  var namesMap = {};

  filteringService.initialiseFilters = function() {
    filters = {
      taxon:{},
      gpSet:{},
      gpID:{},
      reference:{},
      goID:{},
      aspect:{},
      qualifier:{},
      ecoID:{},
      ecoTermUse:'ancestor',
      goTermUse:'ancestor',
      goRelations:'IPO',
      with:{},
      assignedby:{},
      gptype:{}
    };

    // Taxons
    var mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();
    angular.forEach(mostCommonTaxonomies, function(taxon){
      filters.taxon[taxon.taxId] = false;
      namesMap[taxon.taxId] = taxon.title;
    });

    //Basket items
    basketService.getItems().then(function(d){
      var data = d.data;
      angular.forEach(data, function(goTerm){
        filters.goID[goTerm.termId] = (filters.goID[goTerm.termId])
                                            ? filters.goID[goTerm.termId] : false;
        namesMap[goTerm.termId] = goTerm.name;
      });
    });


    // Get Evidence Types
    var resultET = evidencetypes.query();
    resultET.$promise.then(function(data){
      var evidenceTypes = _.sortBy(data, 'evidenceGOID');
      //The order of the evidence codes is important
      angular.forEach(evidenceTypes, function(evidenceType){
        (filters.ecoID[evidenceType.ecoID]) = (filters.ecoID[evidenceType.ecoID])
                                                  ? filters.ecoID[evidenceType.ecoID] : false;
        namesMap[evidenceType.ecoID] = {
          evidenceGOID: evidenceType.evidenceGOID,
          evidenceName: evidenceType.evidenceName,
          evidenceSortOrder: evidenceType.evidenceSortOrder
        };
      });
    });

    //References
    var referenceList = hardCodedDataService.getFilterReferences();
    angular.forEach(referenceList, function(ref){
      filters.reference[ref.refId] = false;
      namesMap[ref.refId] = ref.name;
    });

    // Get With DBs
    var resultWDB = withDBs.query();
    resultWDB.$promise.then(function(data){
      var withDBs = _.sortBy(data, 'dbId');
      angular.forEach(withDBs, function(withDB){
        filters.with[withDB.dbId] = false;
        namesMap[withDB.dbId] = withDB.xrefDatabase;
      });
    });

    // Get Assigned DBs
    var resultADB = assignDBs.query();
    resultADB.$promise.then(function(data){
      var assignDBs = _.sortBy(data, 'dbId');
      angular.forEach(assignDBs, function(assignDB){
        filters.assignedby[assignDB.dbId] = false;
        namesMap[assignDB.dbId] = assignDB.xrefDatabase;
      });
    });

    // Override filters
    var filters = filteringService.getFilters();
    angular.forEach(filters, function(d){
      if(_.contains( ['ecoTermUse','goTermUse','goRelations'], d.type )) {
        filters[d.type] = d.value;
      } else {
        filters[d.type][d.value] = true;
      }
    });
    return filters;
  }


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

  filteringService.clearGPIds = function() {

  };

  filteringService.clearGOIds = function() {

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
