'use strict';
app.controller('productTypeFilter', function($scope, presetsService, filterService, $rootScope){

  $scope.gpTypes = [];
  $scope.totalChecked = 0;

  var init = function() {
    $scope.gpTypes = filterService.getQueryFilterItems($scope.query.geneProductType);

    presetsService.getPresetsGeneProductTypes().then(function(resp){
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.geneProductType);
      var presetFilterItems = filterService.getPresetFilterItems(resp.data.geneProductTypes, 'id');
      $scope.gpTypes = _.sortBy(filterService.mergeRightToLeft(queryFilterItems, presetFilterItems), 'name');
    });
    $rootScope.alerts = [];
  };

  $scope.reset = function() {
    $scope.query.geneProductType = '';
    init();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.addToQuery('geneProductType', _.pluck(_.filter($scope.gpTypes, 'checked'), 'id'));
    $rootScope.alerts = [];
  };

  $scope.updateSelection = function(term){
    $scope.totalChecked += term.checked ? 1 : -1;
  };

  init();
});
