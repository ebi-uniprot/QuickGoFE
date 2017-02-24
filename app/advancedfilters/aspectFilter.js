'use strict';
app.controller('aspectFilter', function($scope, presetsService, filterService, $rootScope){
  $scope.aspects = [];
  $scope.totalChecked = 0;

  var init = function() {
    $scope.aspects = filterService.getQueryFilterItems($scope.query.aspect);

    presetsService.getPresetsAspects().then(function(resp){
      var aspects = filterService.getPresetFilterItems(resp.data.aspects, 'id');
      $scope.aspects = _.sortBy(filterService.mergeRightToLeft($scope.aspects, aspects), 'name');
    });

    $rootScope.alerts = [];
  };

  $scope.reset = function() {
    $scope.$parent.query.aspect = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('aspect', _.pluck(_.filter($scope.aspects, 'checked'), 'id'));
    $rootScope.alerts = [];
  };

  $scope.updateNumberOfCheckedItems = function(term){
    $scope.totalChecked += term.checked ? 1 : -1;
  };

  init();
});
