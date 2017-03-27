'use strict';
app.controller('productTypeFilter', function($scope, presetsService, filterService, $rootScope){

  $scope.gpTypes = [];
  $scope.totalChecked = 0;

  var init = function() {
    $rootScope.cleanErrorMessages();

    $scope.gpTypes = filterService.getQueryFilterItems($scope.query.geneProductType);

    presetsService.getPresetsGeneProductTypes().then(function(resp){
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.geneProductType);
      var presetFilterItems = filterService.getPresetFilterItems(resp.data.geneProductTypes, 'id');
      $scope.gpTypes = _.sortBy(filterService.mergeArrays(queryFilterItems, presetFilterItems), 'name');
    });
  };

  $scope.reset = function() {
    $rootScope.cleanErrorMessages();
    $scope.query.geneProductType = '';
    init();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.addToQueryAndUpdate('geneProductType', _.pluck(_.filter($scope.gpTypes, 'checked'), 'id'));
  };

  $scope.updateTotalCheckedOnChange = function(term){
    $scope.totalChecked += term.checked ? 1 : -1;
  };

  init();
});
