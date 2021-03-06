'use strict';
app.controller('evidenceFilter', function ($scope, presetsService, stringService, validationService, filterService,
                                           hardCodedDataService, $rootScope, limitChecker) {

  $scope.ecos = {};
  $scope.evidenceCodeUsage = 'descendants';
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().eco;

  var init = function () {
    $scope.ecos = filterService.getQueryFilterItems($scope.query.evidenceCode);
    $scope.evidenceCodeUsage = 'descendants';

    presetsService.getPresetsEvidences().then(function (d) {
      var filterItems = filterService.getPresetFilterItems(d.data.evidences, 'id');
      $scope.ecos = filterService.mergeArrays(filterItems, $scope.ecos);
      $scope.ecos.reverse();
    });
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.ecos), 'checked'), 'id');
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('evidenceCode', getQuery());
    $scope.$parent.addToQueryAndUpdate('evidenceCodeUsage', $scope.evidenceCodeUsage);
  };

  $scope.reset = function () {
    $scope.$parent.query.evidenceCode = '';
    $scope.$parent.query.evidenceCodeUsage = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.addECOs = function () {
    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea.toUpperCase());
    var validatedItems = filterService.validateItems(ecos, validationService.validateECOTerm);
    $rootScope.stackErrors(validatedItems.invalidItems, 'alert', 'is not a valid evidence code');
    $scope.ecos = limitChecker.getMergedItems($scope.ecos, validatedItems.validItems, $scope.uploadLimit);
    $scope.ecoTextArea = '';
  };

  $scope.$watch('ecos', function() {
    if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.ecos), $scope.uploadLimit)) {
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
    }
  }, true);

  $scope.getTotalChecked = function() {
    return limitChecker.getAllChecked($scope.ecos).length;
  };

  init();
});
