'use strict';
app.controller('geneProductFilter', function ($scope, stringService,
  validationService, presetsService, filterService, hardCodedDataService, $rootScope) {

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
      $scope.totalCheckedSets = $scope.getAllChecked($scope.geneProductSets).length;
    });
    $scope.totalCheckedIds = $scope.getAllChecked($scope.gpIds).length;
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
    $scope.stackErrors(allItems.dismissedItems, 'alert', 'is not a valid gene product id');
    var merge = $scope.getEffectiveTotalCheckedAndMergedTerms($scope.gpIds, $scope.totalCheckedIds,
      allItems.filteredItems, $scope.uploadLimit);
    if ($rootScope.isTotalDifferent($scope.totalCheckedIds, merge.totalChecked)) {
      $scope.gpIds = merge.mergedTerms;
      $scope.totalCheckedIds = merge.totalChecked;
    }
    $scope.gpTextArea = '';
  };

  $scope.updateTotalCheckedOnChange = function(term) {
    $rootScope.cleanErrorMessages();
    var currentTotalCheck = $scope.getAllChecked($scope.gpIds).length;
    $scope.totalCheckedIds = $rootScope.getTotalCheckedAfterHandlingLimitError($scope.getAllChecked($scope.gpIds).length,
          $scope.getAllChecked($scope.gpIds).length, $scope.uploadLimit);
    term.checked = $rootScope.isTotalDifferent(currentTotalCheck, $scope.totalCheckedIds) ? !term.checked : term.checked;
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
