'use strict';
app.controller('AdvancedFiltersCtrl', function($scope, $routeParams, $location,
   searchService) {

    $scope.query = $routeParams;

  $scope.addToQuery = function(type,values) {
      $scope.query[type] = values;
      $scope.updateQuery();
    };

    $scope.updateQuery = function() {
      $location.path('/annotations').search(searchService.serializeQuery($scope.query));
    }

    $scope.clearFilters=function() {
      $scope.$broadcast('clearFilters');
    };

    $scope.hasSlims = function() {
      //TODO
    }

    $scope.isActiveFilter = function(type) {
      return $scope.query[type];
    };

    $scope.toggled = function(open) {
      if(!open) {
      }
    };

  });
