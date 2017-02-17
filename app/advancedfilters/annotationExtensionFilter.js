app.controller('annotationExtensionFilterController', function($scope, $rootScope,
                                                               presetsService, filterService, validationService){

  $scope.extension = '';

  var init = function() {
    $scope.extension = $scope.$parent.query.extension ? $scope.$parent.query.extension : '';
    $rootScope.alerts = [];
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('extension', $scope.extension);
    $rootScope.alerts = [];
  };

  $scope.reset = function () {
    $scope.$parent.query.extension = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.addComponent = function() {
      var component = $scope.relationship + '(' + $scope.dbId + ')';
      $scope.extension = $scope.extension + ($scope.extension ? ',' : '') + component;
      $scope.relationship = '';
      $scope.dbId = '';
  };

  $scope.$on('applyAEFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetAEFilters', function() {
    $scope.reset();
  });

  init();
});
