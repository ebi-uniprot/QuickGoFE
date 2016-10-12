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
  }

  $scope.clearFilters = function () {
    $scope.query = {};
    $scope.updateQuery();
  };

  $scope.hasSlims = function () {
    //TODO
  }

  $scope.isActiveFilter = function (type) {
    return $scope.query[type] != undefined;
  };

  $scope.toggled = function (open) {
    if (!open) {}
  };

});