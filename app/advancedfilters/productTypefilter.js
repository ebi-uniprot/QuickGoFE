app.controller('productTypeFilter', function($scope){

  var init = function() {
    $scope.gpType = {};
  }

  $scope.resetGPType = function() {
    init();
  }

  init();
});
