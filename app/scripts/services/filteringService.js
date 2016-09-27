'use strict';

var filteringModule = angular.module('quickGoFeApp.FilteringModule', []);

filteringModule.factory('filteringService', function(hardCodedDataService,
   evidencetypes, withDBs, assignDBs, basketService) {
  var filteringService = {};
  var _filters = {};
  var _namesMap = {};

  filteringService.initialiseFilters = function() {
    _filters = {
          taxon:{},
          gpSet:{},
          gpID:{},
          gpType:{},
          referenceSearch:{},
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

    filteringService.initTaxon();
    filteringService.initGpSet();
    filteringService.initGpID();
    filteringService.initGpType();
    filteringService.initReference();
    filteringService.initGoID();
    filteringService.initAspect();
    filteringService.initQualifier();
    //filteringService.initEcoID();
    filteringService.initEcoTermUse();
    filteringService.initGoTermUse();
    filteringService.initGoRelations();
    //filteringService.initWith();
    //filteringService.initAssignedby();
    filteringService.initGptype();

    return _filters;
  };

  filteringService.initGpSet = function(){
    _filters.gpSet = {};
  };

  filteringService.initGpID = function(){
    _filters.gpID = {};
  };

  filteringService.initGpType = function(){
    _filters.gpType = {};
  };

  filteringService.initReference = function() {
    //References
    _filters.referenceSearch = {};
    var referenceList = hardCodedDataService.getFilterReferences();
    angular.forEach(referenceList, function(ref){
      _filters.referenceSearch[ref.refId] = false;
      _namesMap[ref.refId] = ref.name;
    });
  };

  filteringService.initGoID = function() {
    //Basket items
    _filters.goID = {};
    basketService.getItems().then(function(d){
      var data = d.data.results;
      angular.forEach(data, function(goTerm){
        _filters.goID[goTerm.id] = false;
        _namesMap[goTerm.id] = goTerm.name;
      });
    });
  };

  filteringService.initAspect = function() {
    _filters.aspect = {};
  };

  filteringService.initQualifier = function() {
    _filters.qualifier = {};
  };

  filteringService.initEcoID = function() {
    // Get Evidence Types
    _filters.ecoID = {};
    var resultET = evidencetypes.query();
    resultET.$promise.then(function(data){
      var evidenceTypes = _.sortBy(data, 'evidenceGOID');
      //The order of the evidence codes is important
      angular.forEach(evidenceTypes, function(evidenceType) {
        _filters.ecoID[evidenceType.ecoID] = false;
        _namesMap[evidenceType.ecoID] = {
          evidenceGOID: evidenceType.evidenceGOID,
          evidenceName: evidenceType.evidenceName,
          evidenceSortOrder: evidenceType.evidenceSortOrder
        };
      });
    });
  };

  filteringService.initEcoTermUse = function() {
      _filters.ecoTermUse = 'ancestor';
  };

  filteringService.initGoTermUse = function() {
      _filters.goTermUse = 'ancestor';
  };

  filteringService.initGoRelations = function() {
    _filters.goTermRelations = 'IPO';
  };

  filteringService.initWith = function() {
    // Get With DBs
    _filters.with = {};
    var resultWDB = withDBs.query();
    resultWDB.$promise.then(function(data){
      var withDBs = _.sortBy(data, 'dbId');
      angular.forEach(withDBs, function(withDB){
        _filters.with[withDB.dbId] = false;
        _namesMap[withDB.dbId] = withDB.xrefDatabase;
      });
    });
  };

  filteringService.initAssignedby = function() {
    // Get Assigned DBs
    _filters.assignedby = {};
    var resultADB = assignDBs.query();
    resultADB.$promise.then(function(data){
      var assignDBs = _.sortBy(data, 'dbId');
      angular.forEach(assignDBs, function(assignDB){
        _filters.assignedby[assignDB.dbId] = false;
        _namesMap[assignDB.dbId] = assignDB.xrefDatabase;
      });
    });
  };

  filteringService.initGptype = function() {
      _filters.gpType = {};
  };

  filteringService.addFilter = function(type, key, value) {

    // if _filters[type] is a string (or NOT an object) then set the value to key
    if(typeof _filters[type] !== 'object'){
      _filters[type] = key;
    }else{
      // otherwise _filters[type] is an object so set the property to be key and value to be value
      _filters[type][key] = value;
    }
  };


  filteringService.setFilters = function (filterList){
    _filters = filterList;
  };

  filteringService.getFilters = function(){
    return _filters;
  };

  filteringService.populateAppliedFilters = function() {
    var filterForPost = [];
    angular.forEach(_filters, function(filter, type) {
      if (typeof(filter) === 'string') {
        if (type === 'ecoTermUse') {
          if (hasItems(_filters.ecoID)) {
            filterForPost.push({
              type: type,
              value: filter
            });
          }
        } else if (type === 'goTermUse') {
          if (hasItems(_filters.goID)) {
            filterForPost.push({
              type: type,
              value: filter
            });
          }
        } else if (type === 'goRelations') {
          if (hasItems(_filters.goID)) {
            filterForPost.push({
              type: type,
              value: filter
            });
          }
        }
      } else {
        angular.forEach(filter, function(add, id) {
          if (add) {
            filterForPost.push({
              type: type,
              value: id
            });
          }
        });
      }
    });
    return filterForPost;
  };

  var hasItems = function(terms) {
    return _.find(_.values( terms ), function(val){
      return val;
    });
  };

  /**
  * Clear all filters
  */
  filteringService.clearFilters=function(){
    _filters = filteringService.initialiseFilters();
  };

  filteringService.hasSlims = function() {
    return _filters.goTermUse === "slim";
  };


  filteringService.getApplied = function() {
    var applied = {};
    angular.forEach(_filters, function(val, key) {
      var filterList = _.filter(val, function(el) {
        return el === true;
      });
      if(filterList.length > 0) {
        applied[key] = filterList;
      }
    });
    return applied;
  };

  filteringService.getNamesMap = function() {
    return _namesMap;
  };

  return filteringService;
});
