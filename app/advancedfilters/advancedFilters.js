'use strict';
app.controller('AdvancedFiltersCtrl', function ($scope, $routeParams, $location,
  searchService, $rootScope, hardCodedDataService, filterService) {

  $scope.query = $routeParams;
  $scope.totalChecked = 0;

  $scope.getAllChecked = function(collection) {
    return _.where(collection, {checked: true});
  };

  $scope.getNewTotalBasedOnLimit = function(total, limit) {
      return total > limit ? limit : total;
  };

  var addAboveLimitError = function(uploadLimit) {
    $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg(uploadLimit));
  };

  $scope.getTotalCheckedAfterHandlingLimitError = function(currentTotalChecked, uploadLimit) {
    var totalChecked = $scope.getNewTotalBasedOnLimit(currentTotalChecked, uploadLimit);
    if (totalChecked !== currentTotalChecked) {
        addAboveLimitError(uploadLimit);
    }
    return totalChecked;
  };

  $scope.isTotalDifferent = function (oldTotal, newTotal) {
    return oldTotal !== newTotal;
  };

  $scope.getEffectiveTotalCheckedAndMergedTerms = function(displayedTerms, newTerms, uploadLimit) {
    var mergedTerms = filterService.mergeRightToLeft(newTerms, displayedTerms);
    var totalCheckedAfterMerge = $scope.getAllChecked(mergedTerms).length;
    var totalCheckedAfterHandlingError = $scope.getTotalCheckedAfterHandlingLimitError(totalCheckedAfterMerge,
            uploadLimit);
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
    $rootScope.cleanErrorMessages();
  };

  $scope.hasSlims = function () {
    //TODO
  };

  $scope.toggled = function (open) {
    if (!open) {}
  };

  $scope.apply = function() {
    $scope.$broadcast ('applyMoreFilters');
    $rootScope.cleanErrorMessages();
  };

  $scope.reset = function() {
    $scope.$broadcast ('resetMoreFilters');
    $scope.updateQuery();
    $rootScope.cleanErrorMessages();
  };

  $scope.openMore = function() {

  };

  $scope.updateCheckStatus = function(term) {
    $scope.totalChecked += term.checked ? 1 : -1;
  };

  $scope.updateTotalChecked = function(displayedTerms) {
    $scope.totalChecked = $scope.getAllChecked(displayedTerms).length;
  }
});
