'use strict';
app.controller('evidenceFilter', function ($scope, presetsService, stringService, validationService, filterService,
                                           $rootScope) {

  $scope.ecos = {};
  $scope.evidenceCodeUsage = 'descendants';

  var init = function () {
    $scope.ecos = filterService.getQueryFilterItems($scope.query.evidenceCode);
    $scope.evidenceCodeUsage = 'descendants';

    presetsService.getPresetsEvidences().then(function (d) {
      var filterItems = filterService.getPresetFilterItems(d.data.evidences, 'id');
      $scope.ecos = filterService.mergeRightToLeft($scope.ecos, filterItems);
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
  };

  $scope.addECOs = function () {
    $rootScope.alerts = [];

    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea);
    $scope.stackErrors(_.filter(ecos, function(id) {return !validationService.validateECOTerm(id);}), 'alert',
      'is not a valid evidence code');

    var addedFilterItems = filterService.addFilterItems(ecos, validationService.validateECOTerm);
    $scope.ecos = filterService.mergeRightToLeft(addedFilterItems, $scope.ecos);
    $scope.ecoTextArea = '';
  };

  $scope.updateChecked = function() {
    $rootScope.alerts = [];
  };

  init();
});
