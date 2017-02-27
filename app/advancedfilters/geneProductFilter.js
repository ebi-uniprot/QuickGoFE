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
    $rootScope.alerts = [];
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
    $rootScope.alerts = [];

    var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea.toUpperCase());
    var allItems = filterService.addFilterItems(gps, validationService.validateGeneProduct, true);
    $scope.stackErrors(allItems.dismissedItems, 'alert', 'is not a valid gene product id');
    var merge = $scope.getEffectiveTotalCheckedAndMergedTerms($scope.gpIds, allItems.filteredItems, $scope.uploadLimit);
    if ($scope.hasTotalChanged($scope.totalChecked, merge.totalChecked)) {
      $scope.gpIds = merge.mergedTerms;
      $scope.totalChecked = merge.totalChecked;
    }
    $scope.gpTextArea = '';
  };

  $scope.updateNumberOfCheckedItems = function(){
    $rootScope.cleanErrorMessages();
    $scope.totalChecked = $scope.getTotalCheckedAfterHandlingLimitError($scope.getAllChecked($scope.gpIds).length,
          $scope.uploadLimit);
  };

    $scope.updateCheckStatus = function(term) {
        var currentTotalCheck = $scope.getAllChecked($scope.gpIds).length;
        $scope.updateNumberOfCheckedItems();
        term.checked = $scope.totalChecked === currentTotalCheck ? term.checked : !term.checked;
    };

  initgpIds();
});
