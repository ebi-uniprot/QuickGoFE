'use strict';
app.controller('SearchCtrl', function($scope,  $location, $routeParams, searchService) {
  $scope.searchTerm = $routeParams.searchTerm;
  $scope.decode = function(string) {
    var manuallyEscaped = string
      .replace(/%25252F/i, '/')  // ??
      .replace(/%252F/i, '/')    // double-slash
      .replace(/%2F/i, '/');     // single-slash

    return decodeURIComponent(manuallyEscaped);
  }
});
