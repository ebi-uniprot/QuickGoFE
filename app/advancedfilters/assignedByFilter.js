app.controller('assignedByController', function($scope, presetsService){

  $scope.assignedBy = {};

  var init = function() {
      $scope.assignedBy = {};
      // Get Assigned DBs
      var checked = [];
      if($scope.$parent.query.assignedBy) {
        checked = checked.concat($scope.$parent.query.assignedBy.split(','))
      }

      presetsService.getPresetsAssignedBy().then(function(resp){
        var assignDBs = _.sortBy(resp.data.assignedBy, 'name');
        angular.forEach(assignDBs, function(assignDB){
          assignDB.checked = _.contains(checked, assignDB.name);
          $scope.assignedBy[assignDB.name] = assignDB;
        });
      });
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('assignedBy', getQuery());
  };

  $scope.reset = function () {
    $scope.$parent.query.assignedBy = '';
    init();
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.assignedBy), 'checked'), 'name');
  };

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  init();
});
