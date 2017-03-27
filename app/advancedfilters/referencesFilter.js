'use strict';
app.controller('referencesFilter', function($scope, presetsService, stringService, validationService, filterService,
                                            $rootScope, hardCodedDataService, limitChecker){

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
      $scope.references = filterService.mergeArrays($scope.references, referencePresetItems);
    });
  };

  $scope.addReferences = function() {
    $rootScope.cleanErrorMessages();
    var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea.toUpperCase());
    var validatedItems = filterService.validateItems(refs, validationService.validateOther);
    $rootScope.stackErrors(validatedItems.invalidItems, 'alert', 'is not a valid reference');
    $scope.references = limitChecker.getMergedItems($scope.references, validatedItems.validItems, $scope.uploadLimit);
    $scope.referenceTextArea = '';
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.$parent.addToQueryAndUpdate('reference', getQuery());
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

  $scope.selectTerm = function(term) {
    $rootScope.cleanErrorMessages();
    if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.references), $scope.uploadLimit)) {
      _.find($scope.references, term).checked = false;
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
    }
  };

  initReference();
});
