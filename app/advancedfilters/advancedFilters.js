app.controller('AdvancedFiltersCtrl', function($scope, $rootScope, $routeParams,
  filteringService, hardCodedDataService, PreDefinedSlimSets,
  PreDefinedSlimSetDetail, stringService, validationService) {
    $scope.showAllNotQualifiers = 0;

    // GET DATA
    $scope.qualifiers = hardCodedDataService.getQualifiers();

    // $scope.filters = angular.copy(filteringService.initialiseFilters());
    $scope.appliedFilters = {};
    $scope.view = {};

    $scope.status = {};

    $scope.namesMap = {};

    $scope.$on('filtersUpdate', function() {
      $scope.filters = angular.copy(filteringService.getFilters());
    });

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
        if(validationService.validateECOTerm(ecoID)) {
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

    $scope.selectAllNotQualifiers = function () {
      angular.forEach($scope.qualifiers, function(qualifier) {
        if(qualifier.qualifier.startsWith('NOT'))
        $scope.filters.qualifier[qualifier.qualifier] = true;
      });
    };

    $scope.isActiveFilter = function(type) {
      return $scope.appliedFilters[type];
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

    //Extract parameters from url
    if (Object.keys($routeParams).length > 0) {
      angular.forEach($routeParams, function(val, type) {
        if (type === 'id') {
          var isGoTerm = val.indexOf("GO");
          if (isGoTerm >= 0) {
            filteringService.addFilter('goID', val, true);
          } else {
            filteringService.addFilter('ecoID', val, true);
          }
        } else if (val.split(",").length > 0) {
          angular.forEach(val.split(','), function(value) {
            filteringService.addFilter(type, value, true)
          });
        } else {
          filteringService.addFilter(type, val, true);
        }
      });
      $scope.updateFilters();
    }

    $scope.namesMap = filteringService.getNamesMap();
  });
