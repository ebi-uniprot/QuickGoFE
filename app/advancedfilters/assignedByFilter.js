'use strict';
app.controller('assignedByController', function($scope, presetsService, filterService, $rootScope){

  $scope.assignedBy = [];

  var init = function() {
      $scope.assignedBy = filterService.getQueryFilterItems($scope.query.assignedBy);
      presetsService.getPresetsAssignedBy().then(function(resp){
        var assignDBs = _.sortBy(resp.data.assignedBy, 'name');
        var filterItems = filterService.getPresetFilterItems(assignDBs, 'name');
        $scope.assignedBy = _.sortBy(filterService.mergeArrays(filterItems, $scope.assignedBy), 'id');
      });
  };

  $scope.apply = function() {
    $scope.$parent.addToQueryAndUpdate('assignedBy', getQuery());
  };

  $scope.reset = function () {
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

  $scope.$watch('assignedBy', function() {
    $scope.subscribedFilters.assignedBy = $scope.getTotalChecked();
  }, true);

  $scope.getTotalChecked = function(){
    return _.filter($scope.assignedBy, 'checked').length;
  };

  $scope.getAssignedbyDescription = function(assignedBy) {
    return assignedBy.item && assignedBy.item.description;
  }

  init();
});
