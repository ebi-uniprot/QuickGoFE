'use strict';
app.controller('AdvancedFiltersCtrl', function ($scope, $routeParams, $location,
  searchService, $rootScope, hardCodedDataService, filterService) {

  $scope.query = $routeParams;

  $scope.getAllChecked = function(collection) {
    return _.where(collection, {checked: true});
  };

  $scope.updateSelection = function(collection, term, uploadLimit) {
    var newTotal = $scope.getAllChecked(collection).length;
    if (uploadLimit && (newTotal > uploadLimit)) {
      $rootScope.alerts = [hardCodedDataService.getTermsLimitMsg($scope.uploadLimit)];
      term.checked = !term.checked;
      newTotal--;
    } else {
      $rootScope.alerts = [];
    }
    return newTotal;
  };

  $scope.updateSelectedTerms = function(selection, terms, uploadLimit) {
    var mergedTerms = filterService.mergeRightToLeft(terms, selection);
    var checked = $scope.getAllChecked(mergedTerms);
    if (checked.length > uploadLimit) {
      $rootScope.alerts = [hardCodedDataService.getTermsLimitMsg(uploadLimit)];
      return undefined;
    } else {
      $rootScope.alerts = [];
      return {selection: mergedTerms, totalChecked: checked.length}
    }
  };

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

  };
});
