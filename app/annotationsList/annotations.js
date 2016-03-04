app.controller('Annotations', function($scope, $rootScope, $location) {
  $scope.loadStatistics = function() {
    $rootScope.$emit('loadStatistics');
  }
});
