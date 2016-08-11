app.controller('AdvancedFiltersCtrl', function($scope, $rootScope, $routeParams,
  filteringService, hardCodedDataService, PreDefinedSlimSets,
  PreDefinedSlimSetDetail, stringService) {
    $scope.showAllNotQualifiers = 0;

    // GET DATA
    $scope.qualifiers = hardCodedDataService.getQualifiers();
    $scope.geneProductSets =  hardCodedDataService.getGeneProductSets();

    $scope.filters = angular.copy(filteringService.initialiseFilters());
    $scope.appliedFilters = {};
    $scope.view = {};

    $scope.status = {};

    $scope.namesMap = {};

    $rootScope.$on('filtersUpdate', function() {
      $scope.filters = angular.copy(filteringService.getFilters());
    });

    // Get predefined slim sets
    var resultPSS = PreDefinedSlimSets.query();
    resultPSS.$promise.then(function(data){
      $scope.predefinedSlimSets = data;
    });


    $scope.resetTaxons = function() {
      filteringService.initTaxon();
      $scope.updateFilters();
    };

    $scope.addTaxons = function() {
      var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
      angular.forEach(taxons, function(taxonId){
        if(filteringService.validateTaxon(taxonId)) {
          $scope.filters.taxon[taxonId] = true;
        }
      });
      $scope.taxonTextArea = '';
    };

    $scope.resetgpIds = function() {
      filteringService.initGpSet();
      filteringService.initGpID();
      $scope.updateFilters();
    }

    $scope.resetGPType = function() {
      filteringService.initGpType();
      $scope.updateFilters();
    };

    $scope.addGPs = function() {
      var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea);
      angular.forEach(gps, function(gpID){
        if(filteringService.validateGeneProduct(gpID)) {
          $scope.filters.gpID[gpID] = true;
        }
      });
      $scope.gpTextArea = '';
    };

    $scope.resetGoTerms = function() {
      filteringService.initGoID();
      filteringService.initGoTermUse();
      filteringService.initGoRelations();
      $scope.updateFilters();
    };

    $scope.addGoTerms = function() {
      var goterms = stringService.getTextareaItemsAsArray($scope.goTermsTextArea);
      angular.forEach(goterms, function(goTerm){
        if(filteringService.validateGOTerm(goTerm)){
          $scope.filters.goID[goTerm] = true;
        }
      });
      $scope.goTermsTextArea = '';
    };

    $scope.updatePredefinedSets = function() {
      $scope.availablePredefinedTerms = PreDefinedSlimSetDetail.query({
        setId: $scope.selectedPreDefinedSlimSet.subset
      });
      $scope.availablePredefinedTerms.$promise.then(function(data) {
        angular.forEach(data, function(d) {
          $scope.filters.goID[d.termId] = true;
        })
      });
    };

    $scope.resetAspect = function() {
      filteringService.initAspect();
      $scope.updateFilters();
    };

    $scope.resetECOs = function() {
      filteringService.initEcoID();
      filteringService.initEcoTermUse();
      $scope.updateFilters();
    };

    $scope.addECOs = function() {
      var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea);
      angular.forEach(ecos, function(ecoID){
        if(filteringService.validateECOTerm(ecoID)) {
          $scope.filters.ecoID[ecoID] = true;
        }
      });
      $scope.ecoTextArea = '';
    };

    $scope.addReferences = function() {
      var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea);
      angular.forEach(refs, function(refID){
        $scope.filters.referenceSearch[refID] = true;
      });
      $scope.referenceTextArea = '';
    };


    $scope.addWith = function() {
      var withs = stringService.getTextareaItemsAsArray($scope.withTextArea);
      angular.forEach(withs, function(withId){
        $scope.filters.with[withId] = true;
      });
      $scope.withTextArea = '';
    };

    $scope.resetQualifier = function() {
      filteringService.initQualifier();
      $scope.updateFilters();
    };

    $scope.resetReference = function() {
      filteringService.initReference();
      $scope.updateFilters();
    };

    $scope.resetWith = function() {
      filteringService.initWith();
      $scope.updateFilters();
    };

    $scope.resetAssigned = function() {
      filteringService.initAssignedby();
      $scope.updateFilters();
    };

    $scope.applyFilters = function() {
      filteringService.setFilters($scope.filters);
      $scope.updateFilters();
    };

    $scope.updateFilters = function() {
      closeAllFilters();
      $scope.appliedFilters = filteringService.getApplied();
      $rootScope.$broadcast('filtersUpdate');
    };

    $scope.clearFilters=function() {
      filteringService.clearFilters();
      $scope.updateFilters();
    };

    var closeAllFilters = function() {
      $scope.status.isopenTaxon = false;
      $scope.status.isopenGP = false;
      $scope.status.isopenGT = false;
      $scope.status.isopenGPT = false;
      $scope.status.isopenAspect = false;
      $scope.status.isopenEvidence = false;
      $scope.showMore = false;
    };

    $scope.selectAllNotQualifiers = function () {
      angular.forEach($scope.qualifiers, function(qualifier) {
        if(qualifier.qualifier.startsWith('NOT'))
        $scope.filters.qualifier[qualifier.qualifier] = true;
      });
    };

    $scope.isActiveFilter = function(type) {
      return $scope.appliedFilters[type];
    };

    $scope.toggleMore = function(type) {
      $scope.view[type] = !$scope.view[type];
    };

    $scope.toggled = function(open) {
      if(!open) {
        $scope.appliedFilters = filteringService.getApplied();
        $scope.filters = angular.copy(filteringService.getFilters());
      }
    };

    $scope.isEmptyObject = function(obj) {
      return _.isEmpty(obj);
    };

    angular.forEach($routeParams, function(val, type) {
        if(type === 'id') {
          var isGoTerm = val.indexOf("GO");
          if(isGoTerm >= 0) {
            filteringService.addFilter('goID', val, true);
          } else {
            filteringService.addFilter('ecoID', val, true);
          }
        } else if(val.split(",").length > 0){
          angular.forEach(val.split(','), function(value){
            filteringService.addFilter(type,value,true)
          });
        } else {
          filteringService.addFilter(type, val, true);
        }
        $scope.updateFilters();
    });

    $scope.namesMap = filteringService.getNamesMap();
  });
