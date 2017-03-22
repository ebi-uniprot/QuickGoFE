'use strict';
app.controller('AdvancedFiltersCtrl', function ($scope, $routeParams, $location,
  searchService, $rootScope, limitChecker) {

  $scope.query = $routeParams;
  $scope.totalChecked = 0;

  $scope.addToQueryAndUpdate = function (type, values) {
    $scope.addToQuery(type, values);
    $scope.updateQuery();
  };

  $scope.addToQuery = function (type, values) {
    if(values.length <= 0){
      delete $scope.query[type];
    } else {
      $scope.query[type] = values;
    }
  };

  $scope.updateQuery = function () {
    $location.path('/annotations').search(searchService.serializeQuery($scope.query));
  };

  $scope.clearFilters = function () {
    $rootScope.cleanErrorMessages();
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
    $rootScope.cleanErrorMessages();
    $scope.$broadcast ('applyMoreFilters');
  };

  $scope.reset = function() {
    $rootScope.cleanErrorMessages();
    $scope.$broadcast ('resetMoreFilters');
    $scope.totalChecked = 0;
    $scope.updateQuery();
  };

  $scope.openMore = function() {

  };

  $scope.updateTotalCheckedOnChange = function(term) {
    $scope.totalChecked += term.checked ? 1 : -1;
  };

  $scope.updateTotalCheckedFromDisplay = function(displayedTerms) {
    $scope.totalChecked = limitChecker.getAllChecked(displayedTerms).length;
  }
});
