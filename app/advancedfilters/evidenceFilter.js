'use strict';
app.controller('evidenceFilter', function ($scope, presetsService, stringService, validationService, filterService,
                                           hardCodedDataService, $rootScope) {

  $scope.ecos = {};
  $scope.evidenceCodeUsage = 'descendants';
  $scope.totalChecked = 0;
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().eco;

  var init = function () {
    $scope.ecos = filterService.getQueryFilterItems($scope.query.evidenceCode);
    $scope.evidenceCodeUsage = 'descendants';

    presetsService.getPresetsEvidences().then(function (d) {
      var filterItems = filterService.getPresetFilterItems(d.data.evidences, 'id');
      $scope.ecos = filterService.mergeRightToLeft($scope.ecos, filterItems);
      $scope.totalChecked = $scope.getAllChecked($scope.ecos).length;
    });
    $rootScope.alerts = [];
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.ecos), 'checked'), 'id');
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('evidenceCode', getQuery());
    $scope.$parent.addToQuery('evidenceCodeUsage', $scope.evidenceCodeUsage);
    $rootScope.alerts = [];
  };

  $scope.reset = function () {
    $scope.$parent.query.evidenceCode = '';
    $scope.$parent.query.evidenceCodeUsage = '';
    init();
    $scope.$parent.updateQuery();
    $rootScope.alerts = [];
  };

  $scope.addECOs = function () {
    $rootScope.alerts = [];

    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea.toUpperCase());
    var allItems = filterService.addFilterItems(ecos, validationService.validateECOTerm);
    $scope.stackErrors(allItems.dismissedItems, 'alert', 'is not a valid evidence code');
    var response = $scope.updateSelectedTerms($scope.ecos, allItems.filteredItems, $scope.uploadLimit);
    if (response) {
      $scope.ecos = response.selection;
      $scope.totalChecked = response.totalChecked;
    }
    $scope.ecoTextArea = '';
  };

  $scope.updateNumberOfCheckedItems = function(term){
    $scope.totalChecked = $scope.getTotalCheckedAfterHandlingLimitError($scope.getAllChecked($scope.ecos),
      $scope.uploadLimit);
  };

  init();
});
