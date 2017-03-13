'use strict';
app.controller('referencesFilter', function($scope, presetsService, stringService, validationService, filterService,
                                            $rootScope, hardCodedDataService){

  $scope.references = [];
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().reference;

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.references), 'checked'), 'id');
  };

  var initReference = function() {
    $rootScope.cleanErrorMessages();

    $scope.references = filterService.getQueryFilterItems($scope.query.reference);
    presetsService.getPresetsReferences().then(function(resp){
      var referencePresetItems = filterService.getPresetFilterItems(resp.data.references, 'name');
      $scope.references = filterService.mergeRightToLeft($scope.references, referencePresetItems);
    });
  };

  $scope.addReferences = function() {
    $rootScope.cleanErrorMessages();

    var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea.toUpperCase());
    var allItems = filterService.addFilterItems(refs, validationService.validateOther);
    $scope.stackErrors(allItems.dismissedItems, 'alert', 'is not a valid reference');
    var merge = $scope.getEffectiveTotalCheckedAndMergedTerms($scope.references, $scope.totalChecked,
      allItems.filteredItems, $scope.uploadLimit);
    if ($rootScope.isTotalDifferent($scope.totalChecked, merge.totalChecked)) {
      $scope.references = merge.mergedTerms;
      $scope.updateTotalCheckedFromDisplay($scope.references);
    }
    $scope.referenceTextArea = '';
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.$parent.addToQuery('reference', getQuery());
  };

  $scope.reset = function () {
    $rootScope.cleanErrorMessages();
    $scope.$parent.query.reference = '';
    initReference();
  };

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  $scope.updateTotalCheckedOnChange = function(term) {
    $rootScope.cleanErrorMessages();

    $scope.$parent.updateTotalCheckedOnChange(term);

    var currentTotalCheck = $scope.getAllChecked($scope.references).length;
    $scope.totalChecked = $rootScope.getTotalCheckedAfterHandlingLimitError(
          $scope.getAllChecked($scope.references).length, $scope.getAllChecked($scope.references).length,
          $scope.uploadLimit);

    if ($rootScope.isTotalDifferent(currentTotalCheck, $scope.totalChecked)) {
      term.checked = !term.checked;
      $scope.$parent.updateTotalCheckedOnChange(term);
    }
  };

  initReference();
});
