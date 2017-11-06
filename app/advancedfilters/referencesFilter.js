'use strict';
app.controller('referencesFilter', function ($scope, presetsService, stringService, validationService, filterService, $rootScope, hardCodedDataService, limitChecker) {

  $scope.references = [];
  $scope.uploadLimit = hardCodedDataService
    .getServiceLimits()
    .reference;

  var getQuery = function () {
    return _.pluck(_.filter(_.values($scope.references), 'checked'), 'id');
  };

  var initReference = function () {
    $scope.references = filterService.getQueryFilterItems($scope.query.reference);
    presetsService
      .getPresetsReferences()
      .then(function (resp) {
        var referencePresetItems = filterService.getPresetFilterItems(resp.data.references, 'name');
        $scope.references = filterService.mergeArrays(referencePresetItems, $scope.references);
        $scope.subscribedFilters.reference = $scope.getTotalChecked();
      });
  };

  $scope.addReferences = function () {
    var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea.toUpperCase());
    var validatedItems = filterService.validateItems(refs, validationService.validateOther);
    $rootScope.stackErrors(validatedItems.invalidItems, 'alert', 'is not a valid reference');
    $scope.references = limitChecker.getMergedItems($scope.references, validatedItems.validItems, $scope.uploadLimit);
    $scope.subscribedFilters.reference = $scope.getTotalChecked();
    $scope.referenceTextArea = '';
  };

  $scope.apply = function () {
    $scope
      .$parent
      .addToQueryAndUpdate('reference', getQuery());
  };

  $scope.reset = function () {
    $scope.$parent.query.reference = '';
    initReference();
  };

  $scope.$on('applyMoreFilters', function () {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function () {
    $scope.reset();
  });

  $scope.isAll = function (item) {
    return !(item.indexOf('GO_REF:') >= 0);
  }

  $scope.selectTerm = function (term) {
    if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.references), $scope.uploadLimit)) {
      _
        .find($scope.references, term)
        .checked = false;
      $rootScope
        .alerts
        .push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
    }
    $scope.subscribedFilters.reference = $scope.getTotalChecked();
  };

  $scope.getTotalChecked = function () {
    return _
      .filter($scope.references, 'checked')
      .length;
  };

  initReference();
});
