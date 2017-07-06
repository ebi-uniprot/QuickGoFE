'use strict';
app.controller('AdvancedFiltersCtrl', function ($scope, $routeParams, $location,
  searchService, $rootScope) {

  $scope.query = $routeParams;
  
  // handle old style url
  if($scope.query.ac) {
    $scope.query.geneProductId = $scope.query.ac;
    $scope.query.ac = null;
  }


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
    $scope.query = {};
    $scope.updateQuery();
  };

});
