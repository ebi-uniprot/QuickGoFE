'use strict';
app.controller('annotationExtensionFilterController', function($scope){

  $scope.extension = '';

  var init = function() {
    $scope.extension = $scope.$parent.query.extension ? $scope.$parent.query.extension : '';
  };

  $scope.apply = function() {
    $scope.$parent.addToQueryAndUpdate('extension', $scope.extension);
  };

  $scope.reset = function () {
    $scope.$parent.query.extension = '';
    init();
    $scope.$parent.updateQuery();
    $scope.relationship = '';
    $scope.db = '';
    $scope.id = '';
  };

  $scope.addComponent = function() {
      var component = $scope.relationship + '(' + $scope.db + ':' + $scope.id + ')';
      $scope.extension = $scope.extension + ($scope.extension ? ',' : '') + component;
      $scope.relationship = '';
      $scope.db = '';
      $scope.id = '';
  };

  $scope.relationshipData = [
    {
      'name':'part_of'
    },{
      'name':'is_a'
    }
  ];

  $scope.databaseData = [
    {
      'name':'UBERON'
    },{
      'name':'Swissprot'
    }
  ];


  $scope.$on('applyAEFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetAEFilters', function() {
    $scope.reset();
  });

  init();
});
