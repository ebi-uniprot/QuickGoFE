'use strict';
app.controller('referencesFilter', function($scope, presetsService, stringService, validationService, filterService,
                                            $rootScope){

  $scope.references = [];

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.references), 'checked'), 'id');
  };

  var initReference = function() {
    $scope.references = filterService.getQueryFilterItems($scope.query.reference);
    presetsService.getPresetsReferences().then(function(resp){
      var referencePresetItems = filterService.getPresetFilterItems(resp.data.references, 'name');
      $scope.references = filterService.mergeRightToLeft($scope.references, referencePresetItems);
    });
    $rootScope.alerts = [];
  };

  $scope.addReferences = function() {
    var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea.toUpperCase());
    var allItems = filterService.addFilterItems(refs, validationService.validateOther);
    $scope.stackErrors(allItems.dismissedItems, 'alert', 'is not a valid reference');
    $scope.references = filterService.mergeRightToLeft(allItems.filterItems, $scope.references);
    $scope.referenceTextArea = '';
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('reference', getQuery());
    $rootScope.alerts = [];
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

  initReference();
});
