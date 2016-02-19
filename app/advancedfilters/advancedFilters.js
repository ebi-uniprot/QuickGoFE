app.controller('AdvancedFiltersCtrl', function($scope, $rootScope, $location, basketService, evidencetypes, withDBs,
 assignDBs, filteringService, hardCodedDataService, PreDefinedSlimSets, PreDefinedSlimSetDetail, stringService) {


  //Define objects to take values
  $scope.namesMap = {};

  var initialiseFilters = function() {
    $scope.filters = {
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
      goRelations:'I',
      with:{},
      assignedby:{},
      gptype:{}
    };

    // Taxons
    var mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();
    angular.forEach(mostCommonTaxonomies, function(taxon){
      $scope.filters.taxon[taxon.taxId] = false;
      $scope.namesMap[taxon.taxId] = taxon.title;
    });

    //Basket items
    basketService.getItems().then(function(d){
      var data = d.data;
      angular.forEach(data, function(goTerm){
        $scope.filters.goID[goTerm.termId] = false;
        $scope.namesMap[goTerm.termId] = goTerm.name;        
      });
    });


    // Get Evidence Types   
    var resultET = evidencetypes.query();
    resultET.$promise.then(function(data){
      var evidenceTypes = _.sortBy(data, 'evidenceGOID');
      //The order of the evidence codes is important
      angular.forEach(evidenceTypes, function(evidenceType){
        $scope.filters.ecoID[evidenceType.ecoID] = false;
        $scope.namesMap[evidenceType.ecoID] = {
          evidenceGOID: evidenceType.evidenceGOID,
          evidenceName: evidenceType.evidenceName,
          evidenceSortOrder: evidenceType.evidenceSortOrder
        };
      });
    });

    //References
    var referenceList = hardCodedDataService.getFilterReferences();
    angular.forEach(referenceList, function(ref){
      $scope.filters.reference[ref.refId] = false;
      $scope.namesMap[ref.refId] = ref.name;
    });

    // Get With DBs
    var resultWDB = withDBs.query();
    resultWDB.$promise.then(function(data){
      var withDBs = _.sortBy(data, 'dbId');
      angular.forEach(withDBs, function(withDB){
        $scope.filters.with[withDB.dbId] = false;
        $scope.namesMap[withDB.dbId] = withDB.xrefDatabase;
      });
    });

    // Get Assigned DBs
    var resultADB = assignDBs.query();
    resultADB.$promise.then(function(data){
      var assignDBs = _.sortBy(data, 'dbId');
      angular.forEach(assignDBs, function(assignDB){
        $scope.filters.assignedby[assignDB.dbId] = false;
        $scope.namesMap[assignDB.dbId] = assignDB.xrefDatabase;
      });
    });
    console.log('Filters:', $scope.filters);
  }

  $scope.useSlim = 0;
  $scope.showAllNotQualifiers = 0;
  var filters = filteringService.getFilters();

  // GET DATA
  $scope.qualifiers = hardCodedDataService.getQualifiers();
  $scope.geneProductSets =  hardCodedDataService.getGeneProductSets();

  // Get predefined slim sets
  var resultPSS = PreDefinedSlimSets.query();
  resultPSS.$promise.then(function(data){
    $scope.predefinedSlimSets = data;
  });


  $scope.addTaxons = function() {
    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    angular.forEach(taxons, function(taxonId){
      $scope.filters.taxon[taxonId] = true;
    });
    $scope.updateFilters();
    $scope.taxonTextArea = '';
  }

  $scope.addGPs = function() {
    var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea);
    angular.forEach(gps, function(gpID){
      $scope.filters.gpID[gpID] = true;
    });
    $scope.updateFilters();
    $scope.gpTextArea = '';
  }

  $scope.addGoTerms = function() {
    var goterms = stringService.getTextareaItemsAsArray($scope.goTermsTextArea);
    angular.forEach(goterms, function(goTerm){
      $scope.filters.goID[goTerm] = true;
    });
    $scope.updateFilters();
    $scope.goTermsTextArea = '';
  }

  $scope.updatePredefinedSets = function() {
    $scope.availablePredefinedTerms = PreDefinedSlimSetDetail.query({
      setId: $scope.selectedPreDefinedSlimSet.subset
    });
    $scope.availablePredefinedTerms.$promise.then(function(data) {
      angular.forEach(data, function(d) {
        $scope.filters.goID[d.termId] = true;
      })
      $scope.updateFilters();
    });
  };

  $scope.addECOs = function() {
    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea);
    angular.forEach(ecos, function(ecoID){
      $scope.filters.ecoID[ecoID] = true;
    });
    $scope.updateFilters();
    $scope.ecoTextArea = '';
  }

  $scope.addReferences = function() {
    var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea);
    angular.forEach(refs, function(refID){
      $scope.filters.reference[refID] = true;
    });
    $scope.updateFilters();
    $scope.referenceTextArea = '';
  }


  $scope.addWith = function() {
    var withs = stringService.getTextareaItemsAsArray($scope.withTextArea);
    angular.forEach(withs, function(withId){
      $scope.filters.with[withId] = true;
    });
    $scope.updateFilters();
    $scope.withTextArea = '';
  }


  $scope.updateFilters = function() {
    //Clear existing filters
    filteringService.clearFilters();

    filteringService.populateAppliedFilters($scope.filters, $scope.isSlim);

    //Tell annotations list this value has been updated.
    $rootScope.$emit('filtersUpdate', $scope.advancedFilters);   //todo change this so is notification only

    //Now go back to the annotation list
    $location.path("annotations");
    var filters = filteringService.getFilters();
  }

  $scope.clearFilters=function() {
    filteringService.clearFilters();
    initialiseFilters();
    $rootScope.$emit('filtersClear');
  };


  $scope.selectAllNotQualifiers = function () {
    angular.forEach($scope.qualifiers, function(qualifier) {
      if(qualifier.qualifier.startsWith('NOT'))
        $scope.filters.qualifier[qualifier.qualifier] = true;
    });
    $scope.updateFilters();
  }


  $scope.countElements = function(elements) {
    return _.filter(elements, function(el) {
      return el === true;
    }).length;
  }

  initialiseFilters();

});
