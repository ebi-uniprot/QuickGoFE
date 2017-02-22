'use strict';
app.controller('geneProductFilter', function ($scope, stringService,
  validationService, presetsService, filterService, hardCodedDataService, $rootScope) {

  $scope.gpIds = [];
  $scope.geneProductSets = [];
  $scope.totalChecked = 0;
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().geneProductId;

  var initgpIds = function () {
    $scope.gpIds = filterService.getQueryFilterItems($scope.query.geneProductId);
    presetsService.getPresetsGeneProducts().then(function(resp){
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.targetSet);
      var presetFilterItems = filterService.getPresetFilterItems(_.sortBy(resp.data.geneProducts, 'name'), 'name');
      $scope.geneProductSets = filterService.mergeRightToLeft(queryFilterItems, presetFilterItems);
    });
    $scope.totalChecked = $scope.getAllChecked($scope.gpIds).length;
  };

  $scope.reset = function () {
    $scope.query.geneProductId = '';
    $scope.query.targetSet = '';
    initgpIds();
    $scope.updateQuery();
    $rootScope.alerts = [];
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
    var response = $scope.updateSelectedTerms($scope.gpIds, filterItems, $scope.uploadLimit);
    if (response) {
      $scope.gpIds = response.selection;
      $scope.totalChecked = response.totalChecked;
    }
    $scope.gpTextArea = '';
  };

  $scope.updateSelection = function(term){
    $scope.totalChecked = $scope.$parent.updateSelection($scope.gpIds, term, $scope.uploadLimit);
  };

  initgpIds();
});
