'use strict';
app.controller('assignedByController', function($scope, presetsService, filterService, $rootScope){

  $scope.assignedBy = [];

  var init = function() {
      $scope.assignedBy = filterService.getQueryFilterItems($scope.query.assignedBy);
      presetsService.getPresetsAssignedBy().then(function(resp){
        var assignDBs = _.sortBy(resp.data.assignedBy, 'name');
        var filterItems = filterService.getPresetFilterItems(assignDBs, 'name');
        $scope.assignedBy = filterService.mergeRightToLeft($scope.assignedBy, filterItems);
      });
      $rootScope.cleanErrorMessages();
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('assignedBy', getQuery());
    $rootScope.cleanErrorMessages();
  };

  $scope.reset = function () {
    $scope.$parent.query.assignedBy = '';
    init();
    $rootScope.cleanErrorMessages();
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
