app.controller('Annotations', function($scope, $rootScope, $location) {
  $scope.loadStatistics = function() {
    $scope.$broadcast('loadStatistics');
  }
});
