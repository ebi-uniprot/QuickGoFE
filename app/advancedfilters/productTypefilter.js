app.controller('productTypeFilter', function($scope){

  var init = function() {
    $scope.gpType = {};
  }

  $scope.reset = function() {
    init();
  }

  init();
});
