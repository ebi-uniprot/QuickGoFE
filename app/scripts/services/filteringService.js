var filteringModule = angular.module('quickGoFeApp.FilteringModule', []);

filteringModule.factory('filteringService', function(hardCodedDataService,
   evidencetypes, withDBs, assignDBs, basketService) {
  var filteringService = {};
  var _filters = {};
  var _reset = true;

  //Define objects to take values
    var _namesMap = {};

  filteringService.initialiseFilters = function() {
    _filters = {
          taxon:{},
          gpSet:{},
          gpID:{},
          gpType:{},
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
      _filters.taxon[taxon.taxId] = false;
      _namesMap[taxon.taxId] = taxon.title;
    });

    //Basket items
    basketService.getItems().then(function(d){
      var data = d.data;
      angular.forEach(data, function(goTerm){
        _filters.goID[goTerm.termId] = (_filters.goID[goTerm.termId])
                                            ? _filters.goID[goTerm.termId] : false;
        _namesMap[goTerm.termId] = goTerm.name;
      });
    });


    // Get Evidence Types
    var resultET = evidencetypes.query();
    resultET.$promise.then(function(data){
      var evidenceTypes = _.sortBy(data, 'evidenceGOID');
      //The order of the evidence codes is important
      angular.forEach(evidenceTypes, function(evidenceType){
        (_filters.ecoID[evidenceType.ecoID]) = (_filters.ecoID[evidenceType.ecoID])
                                                  ? _filters.ecoID[evidenceType.ecoID] : false;
        _namesMap[evidenceType.ecoID] = {
          evidenceGOID: evidenceType.evidenceGOID,
          evidenceName: evidenceType.evidenceName,
          evidenceSortOrder: evidenceType.evidenceSortOrder
        };
      });
    });

    //References
    var referenceList = hardCodedDataService.getFilterReferences();
    angular.forEach(referenceList, function(ref){
      _filters.reference[ref.refId] = false;
      _namesMap[ref.refId] = ref.name;
    });

    // Get With DBs
    var resultWDB = withDBs.query();
    resultWDB.$promise.then(function(data){
      var withDBs = _.sortBy(data, 'dbId');
      angular.forEach(withDBs, function(withDB){
        _filters.with[withDB.dbId] = false;
        _namesMap[withDB.dbId] = withDB.xrefDatabase;
      });
    });

    // Get Assigned DBs
    var resultADB = assignDBs.query();
    resultADB.$promise.then(function(data){
      var assignDBs = _.sortBy(data, 'dbId');
      angular.forEach(assignDBs, function(assignDB){
        _filters.assignedby[assignDB.dbId] = false;
        _namesMap[assignDB.dbId] = assignDB.xrefDatabase;
      });
    });

    return _filters;
  }

  filteringService.addFilter = function(type, key, value) {
    _filters[type][key] = value;
  }


  filteringService.setFilters = function (filterList){
    _filters = filterList;
  }

  filteringService.getFilters = function(){
    return _filters;
  }

  filteringService.populateAppliedFilters = function(){
    var filterForPost = [];
    angular.forEach(_filters, function(filter, type){
      if(typeof(filter) === 'string') {
        if(type === 'ecoTermUse'){
          if(hasItems(_filters.ecoID)) {
            filterForPost.push({type: type, value:filter});
          }
        } else if (type === 'goTermUse') {
          if(hasItems(_filters.goID)) {
            filterForPost.push({type: type, value:filter});
          }
        } else if (type === 'goRelations') {
          if(hasItems(_filters.goID)) {
            filterForPost.push({type: type, value:filter});
          }
        }
      } else {
        angular.forEach(filter, function(add, id){
          if(add) {
            filterForPost.push({type: type, value:id});
          }
        });
      }
    });
    return filterForPost;
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
    _filters = filteringService.initialiseFilters();
  };

  filteringService.clearGPIds = function() {

  };

  filteringService.clearGOIds = function() {

  };

  filteringService.hasSlims = function() {
    return _.find(_filters, function(rw){ return rw.value == "slim" })
  }

  return filteringService;
});
