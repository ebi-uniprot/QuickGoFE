'use strict';
app.controller('geneProductFilter', function(
  $scope,
  stringService,
  validationService,
  presetsService,
  filterService,
  hardCodedDataService,
  $rootScope,
  limitChecker
) {
  $scope.gpIds = [];
  $scope.geneProductSets = [];
  $scope.gpTypes = [];
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().geneProductId;

  var initgpIds = function() {
    $scope.gpIds = filterService.getQueryFilterItems($scope.query.geneProductId);
    presetsService.getPresetsGeneProducts().then(function(resp) {
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.targetSet);
      var presetFilterItems = filterService.getPresetFilterItems(
        _.sortBy(resp.data.geneProducts, 'name'),
        'name'
      );
      $scope.geneProductSets = filterService.mergeArrays(queryFilterItems, presetFilterItems);
    });
  };

  var initgpTypes = function() {
    $scope.gpTypes = filterService.getQueryFilterItems($scope.query.geneProductType);
    presetsService.getPresetsGeneProductTypes().then(function(resp) {
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.geneProductType);
      var presetFilterItems = filterService.getPresetFilterItems(resp.data.geneProductTypes, 'id');
      $scope.gpTypes = _.sortBy(
        filterService.mergeArrays(presetFilterItems, queryFilterItems),
        'name'
      );
    });
  };

  var init = function() {
    initgpIds();
    initgpTypes();
  };

  $scope.reset = function() {
    $scope.query.geneProductId = '';
    $scope.query.targetSet = '';
    $scope.query.geneProductType = '';
    init();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    if ($scope.gpIds.length > 0) {
      $scope.addToQuery('geneProductId', _.pluck(_.filter($scope.gpIds, 'checked'), 'id'));
    }
    if ($scope.geneProductSets.length > 0) {
      $scope.addToQuery('targetSet', _.pluck(_.filter($scope.geneProductSets, 'checked'), 'id'));
    }
    if ($scope.gpTypes.length > 0) {
      $scope.addToQuery('geneProductType', _.pluck(_.filter($scope.gpTypes, 'checked'), 'id'));
    }
    $scope.updateQuery();
  };

  $scope.addGPs = function() {
    var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea.toUpperCase());
    var validatedItems = filterService.validateItems(
      gps,
      validationService.validateGeneProduct,
      true
    );
    $rootScope.stackErrors(validatedItems.invalidItems, 'alert', 'is not a valid gene product id');
    $scope.gpIds = limitChecker.getMergedItems(
      $scope.gpIds,
      validatedItems.validItems,
      $scope.uploadLimit
    );
    $scope.gpTextArea = '';
  };

  $scope.$watch(
    'gpIds',
    function() {
      if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.gpIds), $scope.uploadLimit)) {
        $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
      }
    },
    true
  );

  $scope.getTotalChecked = function() {
    return (
      limitChecker.getAllChecked($scope.gpIds).length +
      limitChecker.getAllChecked($scope.geneProductSets).length +
      _.filter($scope.gpTypes, 'checked').length
    );
  };

  $scope.getCheckedIds = function() {
    return limitChecker.getAllChecked($scope.gpIds).length;
  };

  $scope.getCheckedSets = function() {
    return limitChecker.getAllChecked($scope.geneProductSets).length;
  };

  init();
});
