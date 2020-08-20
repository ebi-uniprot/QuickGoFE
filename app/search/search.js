'use strict';
app.controller('SearchCtrl', function($scope,  $location, $routeParams, searchService) {
  $scope.searchTerm = $routeParams.searchTerm;
});
