'use strict';
app.controller('annotationExtensionFilterController', function($scope, presetsService){

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

  presetsService.getPresetsExtensionRelations().then(function(d){
    var data = d.data.extRelations;
    $scope.relationshipData = _.map(data, function(item){
      return {
        'name':item.id
      };
    });
  });

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
