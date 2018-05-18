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
        $scope.references = _.chain($scope.references).sortBy('id').sortBy(function(d){
          return d.id.indexOf('GO_REF:') >= 0;
        }).value();
      });
  };

  $scope.addReferences = function () {
    var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea.toUpperCase());
    var validatedItems = filterService.validateItems(refs, validationService.validateOther);
    $rootScope.stackErrors(validatedItems.invalidItems, 'alert', 'is not a valid reference');
    $scope.references = limitChecker.getMergedItems($scope.references, validatedItems.validItems, $scope.uploadLimit);
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
    $scope.$parent.updateQuery();
  };

  $scope.isAll = function (item) {
    return !(item.indexOf('GO_REF:') >= 0);
  };

  $scope.$watch('references', function () {
    if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.references), $scope.uploadLimit)) {
      $rootScope
        .alerts
        .push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
    }
  }, true);

  $scope.getTotalChecked = function () {
    return _
      .filter($scope.references, 'checked')
      .length;
  };

  $scope.getReferenceDescription = function (reference) {
    if (reference.item) {
      return ((reference.id.indexOf('GO_REF:') >= 0) ? '' : 'Any ') + reference.item.description;
    }
  };

  initReference();
});
