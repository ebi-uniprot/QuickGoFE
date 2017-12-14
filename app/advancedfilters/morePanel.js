'use strict';
app.controller('MorePanel', function ($scope, $rootScope) {

  $scope.subscribedFilters = {
    qualifier:0,
    withFrom:0,
    assignedBy:0
  };

  $scope.getTotalChecked = function() {
    var count = 0;
    angular.forEach($scope.subscribedFilters, function(val){
      count += val;
    });
    return count;
  };

  $scope.apply = function() {
    $scope.$broadcast ('applyMoreFilters');
  };

  $scope.reset = function() {
    $scope.$broadcast ('resetMoreFilters');
    $scope.updateQuery();
  };
});
