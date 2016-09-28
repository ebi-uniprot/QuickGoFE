app.controller('aspectFilter', function($scope){
  var init = function() {
    $scope.aspect = {};
  }

  $scope.resetAspect = function() {
    init();
  }
});
