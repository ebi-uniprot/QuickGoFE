'use strict';
app.controller('annotationExtensionFilterController', function($scope, $rootScope, presetsService){

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
    $scope.extension = ($scope.extension === '*') ? '' : $scope.extension;
      var component = ($scope.relationship ? $scope.relationship : '')
          + ($scope.relationship && $scope.db ? '(' : '') + ($scope.db ? $scope.db : '')
          + ($scope.id ? ':' + $scope.id : '') + ($scope.relationship && $scope.db ? ')' : '');
      $scope.extension = $scope.extension + ($scope.extension ? ',' : '') + component;
      $scope.relationship = '';
      $scope.db = '';
      $scope.id = '';
  };

  $scope.addButtonEnabled = function() {
    return !$scope.relationship && !$scope.db;
  }  

  presetsService.getPresetsExtensionRelations().then(function(d){
    var data = d.data.extRelations;
    $scope.relationshipData = _.map(data, function(item){
      return {
        'name':item.id
      };
    });
  });

  presetsService.getPresetsExtensionDatabases().then(function(d){
    var data = d.data.extDatabases;
    $scope.databaseData = _.map(data, function(item){
      return {
        'name':item.id
      };
    });
  });

  $scope.$on('applyAEFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetAEFilters', function() {
    $scope.reset();
  });

  $scope.getTotalChecked = function() {
    return $scope.extension.length;
  };

  init();
});
