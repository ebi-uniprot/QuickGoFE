'use strict';
app.controller('Annotations', function($scope) {
  $scope.loadStatistics = function() {
    $scope.$broadcast('loadStatistics');
  };
});
