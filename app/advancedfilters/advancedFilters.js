'use strict';
app.controller('AdvancedFiltersCtrl', function ($scope, $routeParams, $location,
  searchService) {

  $scope.query = $routeParams;

  $scope.addToQuery = function (type, values) {
    if(values.length <= 0){
      delete $scope.query[type];
    } else {
      $scope.query[type] = values;
    }
    $scope.updateQuery();
  };

  $scope.updateQuery = function () {
    $location.path('/annotations').search(searchService.serializeQuery($scope.query));
  };

  $scope.clearFilters = function () {
    $scope.query = {};
    $scope.updateQuery();
  };

  $scope.hasSlims = function () {
    //TODO
  };

  $scope.toggled = function (open) {
    if (!open) {}
  };

  $scope.apply = function() {
    $scope.$broadcast ('applyMoreFilters');
  };

  $scope.reset = function() {
    $scope.$broadcast ('resetMoreFilters');
    $scope.updateQuery();
  };

  $scope.openMore = function() {

  }
});
