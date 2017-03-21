'use strict';
app.controller('evidenceFilter', function ($scope, presetsService, stringService, validationService, filterService,
                                           hardCodedDataService, $rootScope) {

  $scope.ecos = {};
  $scope.evidenceCodeUsage = 'descendants';
  $scope.totalChecked = 0;
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().eco;

  var init = function () {
    $rootScope.cleanErrorMessages();

    $scope.ecos = filterService.getQueryFilterItems($scope.query.evidenceCode);
    $scope.evidenceCodeUsage = 'descendants';

    presetsService.getPresetsEvidences().then(function (d) {
      var filterItems = filterService.getPresetFilterItems(d.data.evidences, 'id');
      $scope.ecos = filterService.mergeRightToLeft($scope.ecos, filterItems);
      $scope.totalChecked = $scope.getAllChecked($scope.ecos).length;
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
    var allItems = filterService.addFilterItems(ecos, validationService.validateECOTerm);
    $scope.stackErrors(allItems.dismissedItems, 'alert', 'is not a valid evidence code');
    var merge = $scope.getEffectiveTotalCheckedAndMergedTerms($scope.ecos, $scope.totalChecked,
      allItems.filteredItems, $scope.uploadLimit);
    if ($rootScope.isTotalDifferent($scope.totalChecked, merge.totalChecked)) {
      $scope.ecos = merge.mergedTerms;
      $scope.totalChecked = merge.totalChecked;
    }
    $scope.ecoTextArea = '';
  };

  $scope.updateTotalCheckedOnChange = function(term) {
    $rootScope.cleanErrorMessages();
    var currentTotalCheck = $scope.getAllChecked($scope.ecos).length;
    $scope.totalChecked = $rootScope.getTotalCheckedAfterHandlingLimitError($scope.getAllChecked($scope.ecos).length,
          $scope.getAllChecked($scope.ecos).length, $scope.uploadLimit);
    term.checked = $rootScope.isTotalDifferent(currentTotalCheck, $scope.totalChecked) ? !term.checked : term.checked;
  };

  init();
});
