'use strict';
app.controller('AdvancedFiltersCtrl', function ($scope, $routeParams, $location,
  searchService, $rootScope, hardCodedDataService, filterService) {

  $scope.query = $routeParams;
  $scope.totalChecked = 0;

  $scope.getAllChecked = function(collection) {
    return _.where(collection, {checked: true});
  };

  $scope.getEffectiveTotalCheckedAndMergedTerms = function(displayedTerms, displayedChecked, newTerms, uploadLimit) {
    var mergedTerms = filterService.mergeRightToLeft(newTerms, displayedTerms);
    var totalCheckedAfterMerge = $scope.getAllChecked(mergedTerms).length;
    var totalCheckedAfterHandlingError = $rootScope.getTotalCheckedAfterHandlingLimitError(displayedChecked,
      totalCheckedAfterMerge, uploadLimit);
    return {mergedTerms: mergedTerms, totalChecked: totalCheckedAfterHandlingError}
  };

  $scope.stackErrors = function(elements, type, message, field) {
    $rootScope.alerts = $rootScope.alerts.concat(_.map(
      elements,
      function(elem){
        return {
          type: type,
          msg: (field ? elem[field] : elem) + ' ' + message
        };
      })
    );
  };

  $scope.addToQueryAndUpdate = function (type, values) {
    $scope.addToQuery(type, values);
    $scope.updateQuery();
  };

  $scope.addToQuery = function (type, values) {
    if(values.length <= 0){
      delete $scope.query[type];
    } else {
      $scope.query[type] = values;
    };
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
    $scope.totalChecked = $scope.getAllChecked(displayedTerms).length;
  }
});
