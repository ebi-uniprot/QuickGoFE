'use strict';
app.controller('aspectFilter', function($scope, presetsService, filterService){
  $scope.aspects = [];

  var init = function() {
    $scope.aspects = filterService.getQueryFilterItems($scope.query.aspect);

    presetsService.getPresetsAspects().then(function(resp){
      var aspects = filterService.getPresetFilterItems(resp.data.aspects, 'id');
      $scope.aspects = _.sortBy(filterService.mergeRightToLeft($scope.aspects, aspects), 'name');
    });
  };

  $scope.reset = function() {
    $scope.$parent.query.aspect = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.apply = function() {
    $scope.$parent.addToQueryAndUpdate('aspect', _.pluck(_.filter($scope.aspects, 'checked'), 'id'));
  };

  init();
});
