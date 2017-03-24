'use strict';
app.controller('geneProductFilter', function ($scope, stringService,
  validationService, presetsService, filterService, hardCodedDataService, $rootScope, limitChecker) {

  $scope.gpIds = [];
  $scope.geneProductSets = [];
  $scope.totalChecked = 0;
  $scope.totalCheckedIds = 0;
  $scope.totalCheckedSets = 0;
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().geneProductId;

  var initgpIds = function () {
    $rootScope.cleanErrorMessages();

    $scope.gpIds = filterService.getQueryFilterItems($scope.query.geneProductId);
    presetsService.getPresetsGeneProducts().then(function(resp){
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.targetSet);
      var presetFilterItems = filterService.getPresetFilterItems(_.sortBy(resp.data.geneProducts, 'name'), 'name');
      $scope.geneProductSets = filterService.mergeRightToLeft(queryFilterItems, presetFilterItems);
      $scope.totalCheckedSets = limitChecker.getAllChecked($scope.geneProductSets).length;
    });
    $scope.totalCheckedIds = limitChecker.getAllChecked($scope.gpIds).length;
  };

  $scope.reset = function () {
    $rootScope.cleanErrorMessages();
    $scope.query.geneProductId = '';
    $scope.query.targetSet = '';
    initgpIds();
    $scope.updateQuery();
  };

  $scope.apply = function () {
    $rootScope.cleanErrorMessages();
    if ($scope.gpIds.length > 0) {
      $scope.addToQuery('geneProductId', _.pluck(_.filter($scope.gpIds, 'checked'), 'id'));
    }
    if ($scope.geneProductSets.length > 0) {
      $scope.addToQuery('targetSet', _.pluck(_.filter($scope.geneProductSets, 'checked'), 'id'));
    }
    $scope.updateQuery();
  };

  $scope.addGPs = function () {
     $rootScope.cleanErrorMessages();

    var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea.toUpperCase());
    var allItems = filterService.addFilterItems(gps, validationService.validateGeneProduct, true);
    $rootScope.stackErrors(allItems.dismissedItems, 'alert', 'is not a valid gene product id');
    var merge = limitChecker.getEffectiveTotalCheckedAndMergedTerms($scope.gpIds, $scope.totalCheckedIds,
      allItems.filteredItems, $scope.uploadLimit);
    if (limitChecker.isTotalDifferent($scope.totalCheckedIds, merge.totalChecked)) {
      $scope.gpIds = merge.mergedTerms;
      $scope.totalCheckedIds = merge.totalChecked;
    }
    $scope.gpTextArea = '';
  };

  $scope.updateTotalCheckedOnChange = function(term) {
    $rootScope.cleanErrorMessages();
    var currentTotalCheck = limitChecker.getAllChecked($scope.gpIds).length;
    $scope.totalCheckedIds = limitChecker.getTotalCheckedAfterHandlingLimitError(
      limitChecker.getAllChecked($scope.gpIds).length, limitChecker.getAllChecked($scope.gpIds).length,
      $scope.uploadLimit);
    term.checked = limitChecker.isTotalDifferent(currentTotalCheck, $scope.totalCheckedIds) ? !term.checked : term.checked;
  };

  $scope.updateTotalCheckedOnSetChange = function(set) {
    $scope.totalCheckedSets += set.checked ? 1 : -1;
  };

  $scope.$watch('totalCheckedIds', function() {
    $scope.totalChecked = $scope.totalCheckedIds + $scope.totalCheckedSets;
  });

  $scope.$watch('totalCheckedSets', function() {
    $scope.totalChecked = $scope.totalCheckedIds + $scope.totalCheckedSets;
  });

  initgpIds();
});
