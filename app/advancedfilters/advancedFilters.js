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
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg(uploadLimit));
      return undefined;
    } else {
      return {selection: mergedTerms, totalChecked: checked.length}
    }
  };

  $scope.stackErrors = function(elements, type, message, field) {
    console.log('stackErrors', elements);
    $rootScope.alerts = $rootScope.alerts.concat(_.map(
      elements,
      function(elem){
        return {
          type: type,
          msg: (field ? elem[field] : elem) + ' ' + message
        };
      })
    );
    console.log($rootScope.alerts);
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
    $rootScope.alerts = [];
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
