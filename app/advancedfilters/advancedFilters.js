app.controller('AdvancedFiltersCtrl', function($scope, $location, basketService, evidencetypes, withDBs,
  assignDBs, filteringService, hardCodedDataService, PreDefinedSlimSets, PreDefinedSlimSetDetail, stringService) {

    $scope.showAllNotQualifiers = 0;

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
        if(filteringService.validateTaxon(taxonId)) {
          $scope.filters.taxon[taxonId] = true;
        }
      });
      $scope.updateFilters();
      $scope.taxonTextArea = '';
    }

    $scope.addGPs = function() {
      var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea);
      angular.forEach(gps, function(gpID){
        if(filteringService.validateGeneProduct(gpID)) {
          $scope.filters.gpID[gpID] = true;
        }
      });
      $scope.updateFilters();
      $scope.gpTextArea = '';
    }

    $scope.addGoTerms = function() {
      var goterms = stringService.getTextareaItemsAsArray($scope.goTermsTextArea);
      angular.forEach(goterms, function(goTerm){
        if(filteringService.validateGOTerm(goTerm)){
          $scope.filters.goID[goTerm] = true;
        }
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
        if(filteringService.validateECOTerm(ecoID)) {
          $scope.filters.ecoID[ecoID] = true;
        }
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
      $scope.$parent.$parent.$broadcast('filtersUpdate', $scope.advancedFilters);

      //Now go back to the annotation list
      $location.path("annotations");
      var filters = filteringService.getFilters();
      // console.log(filters);
    }

    $scope.clearFilters=function() {
      filteringService.clearFilters();
      initialiseFilters();
      $scope.$parent.$parent.$broadcast('filtersClear');
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
