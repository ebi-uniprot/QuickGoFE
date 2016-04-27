app.controller('AdvancedFiltersCtrl', function($scope, $routeParams,
  filteringService, hardCodedDataService, PreDefinedSlimSets,
  PreDefinedSlimSetDetail, stringService) {
    $scope.showAllNotQualifiers = 0;

    // GET DATA
    $scope.qualifiers = hardCodedDataService.getQualifiers();
    $scope.geneProductSets =  hardCodedDataService.getGeneProductSets();

    $scope.filters = filteringService.initialiseFilters();

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
    });

    // Get predefined slim sets
    var resultPSS = PreDefinedSlimSets.query();
    resultPSS.$promise.then(function(data){
      $scope.predefinedSlimSets = data;
    });


    $scope.addTaxons = function() {
      var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
      angular.forEach(taxons, function(taxonId){
        if(filteringService.validateTaxon(taxonId)) {
          filteringService.addFilter('taxon',taxonId,true);
        }
      });
      $scope.updateFilters();
      $scope.taxonTextArea = '';
    }

    $scope.addGPs = function() {
      var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea);
      angular.forEach(gps, function(gpID){
        if(filteringService.validateGeneProduct(gpID)) {
          filteringService.addFilter('gpID',gpID,true);
        }
      });
      $scope.updateFilters();
      $scope.gpTextArea = '';
    }

    $scope.addGoTerms = function() {
      var goterms = stringService.getTextareaItemsAsArray($scope.goTermsTextArea);
      angular.forEach(goterms, function(goTerm){
        if(filteringService.validateGOTerm(goTerm)){
          filteringService.addFilter('goID',goTerm,true);
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
          filteringService.addFilter('goID',d.termId,true);
        })
        $scope.updateFilters();
      });
    };

    $scope.addECOs = function() {
      var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea);
      angular.forEach(ecos, function(ecoID){
        if(filteringService.validateECOTerm(ecoID)) {
          filteringService.addFilter('ecoID',ecoID,true);
        }
      });
      $scope.updateFilters();
      $scope.ecoTextArea = '';
    }

    $scope.addReferences = function() {
      var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea);
      angular.forEach(refs, function(refID){
        filteringService.addFilter('reference',refID,true);
      });
      $scope.updateFilters();
      $scope.referenceTextArea = '';
    }


    $scope.addWith = function() {
      var withs = stringService.getTextareaItemsAsArray($scope.withTextArea);
      angular.forEach(withs, function(withId){
        filteringService.addFilter('with',withId,true);
      });
      $scope.updateFilters();
      $scope.withTextArea = '';
    }


    $scope.updateFilters = function() {
      $scope.$parent.$parent.$broadcast('filtersUpdate');
    }

    $scope.clearFilters=function() {
      filteringService.clearFilters();
      $scope.filters = filteringService.getFilters();
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
  });
