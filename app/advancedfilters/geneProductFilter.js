'use strict';
app.controller('geneProductFilter', function ($scope, stringService,
  validationService, presetsService, filterService, $rootScope) {

  $scope.gpIds = [];
  $scope.geneProductSets = [];

  var initgpIds = function () {
    $scope.gpIds = filterService.getQueryFilterItems($scope.query.geneProductId);
    presetsService.getPresetsGeneProducts().then(function(resp){
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.targetSet);
      var presetFilterItems = filterService.getPresetFilterItems(_.sortBy(resp.data.geneProducts, 'name'), 'name');
      $scope.geneProductSets = filterService.mergeRightToLeft(queryFilterItems, presetFilterItems);
    });
    $rootScope.alerts = [];
  };

  $scope.reset = function () {
    $scope.query.geneProductId = '';
    $scope.query.targetSet = '';
    initgpIds();
    $scope.updateQuery();
  };

  $scope.apply = function () {
    if ($scope.gpIds.length > 0) {
      $scope.addToQuery('geneProductId', _.pluck(_.filter($scope.gpIds, 'checked'), 'id'));
    }
    if ($scope.geneProductSets.length > 0) {
      $scope.addToQuery('targetSet', _.pluck(_.filter($scope.geneProductSets, 'checked'), 'id'));
    }
    $rootScope.alerts = [];
  };

  $scope.addGPs = function () {
    var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea);
    var filterItems = filterService.addFilterItems(gps, validationService.validateGeneProduct);
    $scope.gpIds = filterService.mergeRightToLeft(filterItems, $scope.gpIds);
     $scope.gpTextArea = '';
  };

  initgpIds();
});
