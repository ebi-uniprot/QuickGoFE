'use strict';
app.controller('AdvancedFiltersCtrl', function($scope, $rootScope, $routeParams,
  hardCodedDataService, PreDefinedSlimSets,
  PreDefinedSlimSetDetail, stringService, validationService) {

    $scope.appliedFilters = {};
    $scope.view = {};

    $scope.status = {};

    $scope.namesMap = {};

    $scope.$on('filtersUpdate', function() {
    });

    $scope.applyFilters = function() {
      $scope.updateFilters();
    };

    $scope.updateFilters = function() {
      closeAllFilters();
      $rootScope.$broadcast('filtersUpdate');
    };

    $scope.clearFilters=function() {
      $scope.$broadcast('clearFilters');
    };

    $scope.hasSlims = function() {
      //TODO
    }

    $scope.isActiveFilter = function(type) {
      return $scope.appliedFilters[type];
    };


    $scope.toggled = function(open) {
      if(!open) {
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
            // filteringService.addFilter('goID', val, true);
          } else {
            // filteringService.addFilter('ecoID', val, true);
          }
        } else if (val.split(",").length > 0) {
          angular.forEach(val.split(','), function(value) {
            // filteringService.addFilter(type, value, true)
          });
        } else {
          // filteringService.addFilter(type, val, true);
        }
      });
      $scope.updateFilters();
    }

  });
