'use strict';
app.controller('referencesFilter', function($scope, presetsService, stringService, validationService, filterService,
                                            $rootScope, hardCodedDataService){

  $scope.references = [];
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().reference;

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.references), 'checked'), 'id');
  };

  var initReference = function() {
    $scope.references = filterService.getQueryFilterItems($scope.query.reference);
    presetsService.getPresetsReferences().then(function(resp){
      var referencePresetItems = filterService.getPresetFilterItems(resp.data.references, 'name');
      $scope.references = filterService.mergeRightToLeft($scope.references, referencePresetItems);
    });
    $rootScope.cleanErrorMessages();
  };

  $scope.addReferences = function() {
    $rootScope.cleanErrorMessages();

    var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea.toUpperCase());
    var allItems = filterService.addFilterItems(refs, validationService.validateOther);
    $scope.stackErrors(allItems.dismissedItems, 'alert', 'is not a valid reference');
    var merge = $scope.getEffectiveTotalCheckedAndMergedTerms($scope.references, allItems.filteredItems, $scope.uploadLimit);
    if ($scope.isTotalDifferent($scope.totalChecked, merge.totalChecked)) {
      $scope.references = merge.mergedTerms;
      $scope.updateTotalCheckedFromDisplay($scope.references);
    }
    $scope.referenceTextArea = '';
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('reference', getQuery());
    $rootScope.cleanErrorMessages();
  };

  $scope.reset = function () {
    $scope.$parent.query.reference = '';
    initReference();
  };

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  $scope.updateNumberOfCheckedItems = function(){
    $rootScope.cleanErrorMessages();
    $scope.totalChecked = $scope.getTotalCheckedAfterHandlingLimitError($scope.getAllChecked($scope.references).length,
      $scope.uploadLimit);
  };

  $scope.updateTotalCheckedOnChange = function(term) {
    $scope.$parent.updateTotalCheckedOnChange(term);
    var currentTotalCheck = $scope.getAllChecked($scope.references).length;
    $scope.updateNumberOfCheckedItems();
    if ($scope.totalChecked !== currentTotalCheck) {
      term.checked = !term.checked;
      $scope.$parent.updateTotalCheckedOnChange(term);
    }
  };

  initReference();
});
