app.controller('annotationExtensionFilterController', function($scope, presetsService, filterService, validationService){

  $scope.extension = '';

  var init = function() {
    $scope.extension = '';
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('extension', $scope.extension);
  };

  $scope.reset = function () {
    $scope.$parent.query.extension = '';
    init();
  };

  $scope.addComponent = function() {
    if(validationService.validateGeneProduct($scope.dbId)) {
      var component = $scope.relationship + '(' + $scope.dbId + ')';
      $scope.extension = $scope.extension + ($scope.extension ? ',' : '') + component;
      $scope.relationship = '';
      $scope.dbId = '';
    } else {
      // TODO message
    }
  };

  $scope.$on('applyAEFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetAEFilters', function() {
    $scope.reset();
  });

  init();
});
