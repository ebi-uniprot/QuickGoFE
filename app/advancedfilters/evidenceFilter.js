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
    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea);
    var addedFilterItems = filterService.addFilterItems(ecos, validationService.validateECOTerm);
    var response = $scope.updateSelectedTerms($scope.ecos, addedFilterItems, $scope.uploadLimit);
    if (response) {
      $scope.ecos = response.selection;
      $scope.totalChecked = response.totalChecked;
    }
    $scope.ecoTextArea = '';
  };

  $scope.updateSelection = function(term){
    $scope.totalChecked = $scope.$parent.updateSelection($scope.ecos, term, $scope.uploadLimit);
  };

  init();
});
