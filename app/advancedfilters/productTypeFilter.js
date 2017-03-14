'use strict';
app.controller('productTypeFilter', function($scope, presetsService, filterService){

  $scope.gpTypes = [];

  var init = function() {
    $scope.gpTypes = filterService.getQueryFilterItems($scope.query.geneProductType);

    presetsService.getPresetsGeneProductTypes().then(function(resp){
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.geneProductType);
      var presetFilterItems = filterService.getPresetFilterItems(resp.data.geneProductTypes, 'id');
      $scope.gpTypes = _.sortBy(filterService.mergeRightToLeft(queryFilterItems, presetFilterItems), 'name');
    });
  };

  $scope.reset = function() {
    $scope.query.geneProductType = '';
    init();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.addToQueryAndUpdate('geneProductType', _.pluck(_.filter($scope.gpTypes, 'checked'), 'id'));
  };

  init();
});
