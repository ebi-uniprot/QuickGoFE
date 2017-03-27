'use strict';
app.controller('evidenceFilter', function ($scope, presetsService, stringService, validationService, filterService,
                                           hardCodedDataService, $rootScope, limitChecker) {

  $scope.ecos = {};
  $scope.evidenceCodeUsage = 'descendants';
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().eco;

  var init = function () {
    $rootScope.cleanErrorMessages();

    $scope.ecos = filterService.getQueryFilterItems($scope.query.evidenceCode);
    $scope.evidenceCodeUsage = 'descendants';

    presetsService.getPresetsEvidences().then(function (d) {
      var filterItems = filterService.getPresetFilterItems(d.data.evidences, 'id');
      $scope.ecos = filterService.mergeArrays($scope.ecos, filterItems);
    });
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.ecos), 'checked'), 'id');
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.$parent.addToQuery('evidenceCode', getQuery());
    $scope.$parent.addToQueryAndUpdate('evidenceCodeUsage', $scope.evidenceCodeUsage);
  };

  $scope.reset = function () {
    $rootScope.cleanErrorMessages();
    $scope.$parent.query.evidenceCode = '';
    $scope.$parent.query.evidenceCodeUsage = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.addECOs = function () {
    $rootScope.cleanErrorMessages();
    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea.toUpperCase());
    var filterItems = filterService.validateItems(ecos, validationService.validateECOTerm);
    $rootScope.stackErrors(filterItems.invalidItems, 'alert', 'is not a valid evidence code');
    if(limitChecker.isOverLimit(filterService.mergeArrays($scope.ecos, filterItems), $scope.uploadLimit)) {
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
    } else {
      $scope.ecos = filterService.mergeArrays(filterItems.validItems, $scope.ecos);
    }
    $scope.ecoTextArea = '';
  };

  $scope.updateTotalCheckedOnChange = function(term) {
    $rootScope.cleanErrorMessages();
    if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.ecos), $scope.uploadLimit)) {
      _.find($scope.ecos, term).checked = false;
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
    }
  };

  $scope.getTotalChecked = function() {
    return limitChecker.getAllChecked($scope.ecos).length;
  };

  init();
});
