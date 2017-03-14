'use strict';
app.controller('qualifierFilter', function($scope, hardCodedDataService, filterService){

  $scope.qualifiers = [];
  $scope.showAllNotQualifiers = 0;

  var initQualifiers = function() {
    $scope.qualifiers = filterService.getQueryFilterItems($scope.query.qualifier);
    $scope.showAllNotQualifiers = 0;

    var allQualifiers = filterService.getPresetFilterItems(hardCodedDataService.getQualifiers(), 'qualifier');
    $scope.qualifiers = filterService.mergeRightToLeft($scope.qualifiers, allQualifiers);
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.qualifiers), 'checked'), 'id');
  };

  $scope.selectAllNotQualifiers = function () {
    angular.forEach($scope.qualifiers, function(qualifier) {
      if(qualifier.item.name.lastIndexOf('NOT', 0) === 0) {
        qualifier.checked = true;
      }
    });
  };

  $scope.apply = function() {
    $scope.addToQueryAndUpdate('qualifier', getQuery());
  };

  $scope.reset = function () {
    $scope.query.qualifier = '';
    initQualifiers();
  };

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  initQualifiers();

});
