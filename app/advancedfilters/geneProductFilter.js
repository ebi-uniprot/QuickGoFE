'use strict';
app.controller('geneProductFilter', function ($scope, stringService,
  validationService, presetsService, filterService, hardCodedDataService, $rootScope, limitChecker) {

  $scope.gpIds = [];
  $scope.geneProductSets = [];
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().geneProductId;

  var initgpIds = function () {
    $rootScope.cleanErrorMessages();

    $scope.gpIds = filterService.getQueryFilterItems($scope.query.geneProductId);
    presetsService.getPresetsGeneProducts().then(function(resp){
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.targetSet);
      var presetFilterItems = filterService.getPresetFilterItems(_.sortBy(resp.data.geneProducts, 'name'), 'name');
      $scope.geneProductSets = filterService.mergeArrays(queryFilterItems, presetFilterItems);
    });
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

  $scope.addGPs = function() {
    $rootScope.cleanErrorMessages();
    var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea.toUpperCase());
    var validatedItems = filterService.validateItems(gps, validationService.validateGeneProduct, true);
    $rootScope.stackErrors(validatedItems.invalidItems, 'alert', 'is not a valid gene product id');
    $scope.gpIds = limitChecker.getMergedItems($scope.gpIds, validatedItems.validItems, $scope.uploadLimit);
    $scope.gpTextArea = '';
  };

  $scope.selectItem = function(term) {
    $rootScope.cleanErrorMessages();
    if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.gpIds), $scope.uploadLimit)) {
      _.find($scope.gpIds, term).checked = false;
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
    }
  };

  $scope.getTotalChecked = function() {
    return limitChecker.getAllChecked($scope.gpIds).length + limitChecker.getAllChecked($scope.geneProductSets).length;
  };

  $scope.getCheckedIds = function() {
    return limitChecker.getAllChecked($scope.gpIds).length;
  };

  $scope.getCheckedSets = function() {
    return limitChecker.getAllChecked($scope.geneProductSets).length;
  };

  initgpIds();
});
