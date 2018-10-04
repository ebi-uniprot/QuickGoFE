'use strict';
app.controller('annotationExtensionFilterController', function($scope, $rootScope, presetsService){

  $scope.extension = '';
  $scope.andOrOptions = ['AND', 'OR'];
  $scope.selectedAndOrJoin = undefined;

  var init = function() {
    $scope.extension = $scope.$parent.query.extension ? $scope.$parent.query.extension : '';
    $scope.andOrEnabled = ($scope.extension.length > 0) && ($scope.extension !== '*') ? true : false;
    $scope.selectedAndOrJoin = undefined;
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
    $scope.selectedAndOrJoin = undefined;
  };

  $scope.addThemAll = function() {
    $scope.extension='*';
    $scope.apply();
  };

  $scope.addComponent = function() {
    if (!isOnlyOneWord()) {
      $rootScope.alerts.push({type: 'alert', msg: 'Please ensure you have entered only one ID and try again.'});
    } else {
      $scope.extension = ($scope.extension === '*') ? '' : $scope.extension;
      var component = ($scope.relationship ? $scope.relationship : '')
          + ($scope.relationship && $scope.db ? '(' : '') + ($scope.db ? $scope.db : '')
          + ($scope.id ? ':' + $scope.id : '') + ($scope.relationship && $scope.db ? ')' : '');
      var andOrSpace = $scope.selectedAndOrJoin !== '' ? ' ' + $scope.selectedAndOrJoin + ' ' : '';
      $scope.extension = $scope.extension + ($scope.extension ? andOrSpace : '') + component;
      $scope.relationship = '';
      $scope.db = '';
      $scope.id = '';
      $scope.selectedAndOrJoin = undefined;
      $scope.andOrEnabled = true;
    }
  };

  var isOnlyOneWord = function() {
    return $scope.id
      ? $scope.id.match(/( |,)+/g) === null
      : true;
  };

  $scope.addButtonEnabled = function() {
    var relDataInfo = !$scope.relationship || !$scope.db || !$scope.id;
    return $scope.andOrEnabled ? !$scope.selectedAndOrJoin || relDataInfo : relDataInfo;
  };

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
