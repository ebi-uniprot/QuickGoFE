'use strict';
app.controller('assignedByController', function($scope, presetsService, filterService, $rootScope){

  $scope.assignedBy = [];

  var init = function() {
      $rootScope.cleanErrorMessages();
      $scope.assignedBy = filterService.getQueryFilterItems($scope.query.assignedBy);
      presetsService.getPresetsAssignedBy().then(function(resp){
        var assignDBs = _.sortBy(resp.data.assignedBy, 'name');
        var filterItems = filterService.getPresetFilterItems(assignDBs, 'name');
        $scope.assignedBy = filterService.mergeRightToLeft($scope.assignedBy, filterItems);
      });
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.$parent.addToQueryAndUpdate('assignedBy', getQuery());
  };

  $scope.reset = function () {
    $rootScope.cleanErrorMessages();
    $scope.$parent.query.assignedBy = '';
    init();
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.assignedBy), 'checked'), 'id');
  };

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  init();
});
