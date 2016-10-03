app.controller('aspectFilter', function($scope){
  var init = function() {
    $scope.aspect = {};
  }

  $scope.reset = function() {
    init();
  }

  $scope.$on('clearFilters', function() {
    init();
  });
});
