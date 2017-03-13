'use strict';
app.controller('annotationExtensionFilterController', function($scope, $rootScope){

  $scope.extension = '';

  var init = function() {
    $rootScope.cleanErrorMessages();
    $scope.extension = $scope.$parent.query.extension ? $scope.$parent.query.extension : '';
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.$parent.addToQuery('extension', $scope.extension);
  };

  $scope.reset = function () {
    $rootScope.cleanErrorMessages();
    $scope.$parent.query.extension = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.addComponent = function() {
      var component = $scope.relationship + '(' + $scope.db + ':' + $scope.id + ')';
      $scope.extension = $scope.extension + ($scope.extension ? ',' : '') + component;
      $scope.relationship = '';
      $scope.db = '';
      $scope.id = '';
  };

  $scope.$on('applyAEFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetAEFilters', function() {
    $scope.reset();
  });

  init();
});
