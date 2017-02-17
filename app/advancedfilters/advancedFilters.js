'use strict';
app.controller('AdvancedFiltersCtrl', function ($scope, $routeParams, $location,
  searchService, $rootScope) {

  $scope.query = $routeParams;

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
