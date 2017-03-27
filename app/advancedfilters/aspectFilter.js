'use strict';
app.controller('aspectFilter', function($scope, presetsService, filterService, $rootScope){
  $scope.aspects = [];
  $scope.totalChecked = 0;

  var init = function() {
    $rootScope.cleanErrorMessages();

    $scope.aspects = filterService.getQueryFilterItems($scope.query.aspect);

    presetsService.getPresetsAspects().then(function(resp){
      var aspects = filterService.getPresetFilterItems(resp.data.aspects, 'id');
      $scope.aspects = _.sortBy(filterService.mergeArrays($scope.aspects, aspects), 'name');
    });
  };

  $scope.reset = function() {
    $rootScope.cleanErrorMessages();
    $scope.$parent.query.aspect = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.$parent.addToQueryAndUpdate('aspect', _.pluck(_.filter($scope.aspects, 'checked'), 'id'));
  };

  $scope.updateTotalCheckedOnChange = function(term){
    $scope.totalChecked += term.checked ? 1 : -1;
  };

  init();
});
