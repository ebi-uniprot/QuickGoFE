'use strict';
app.controller('Annotations', function($rootScope, $scope) {
  $scope.loadStatistics = function() {
    $scope.$broadcast('loadStatistics');
  };
  $rootScope.fullWidthPage = true;
});
