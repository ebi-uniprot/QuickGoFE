'use strict';
app.controller('evidenceFilter', function ($scope, presetsService, stringService, validationService, filterService) {

  $scope.ecos = {};
  $scope.evidenceCodeUsage = 'descendants';


  var init = function () {
    $scope.ecos = filterService.getQueryFilterItems($scope.query.evidenceCode);
    $scope.evidenceCodeUsage = 'descendants';

    presetsService.getPresetsEvidences().then(function (d) {
      var filterItems = filterService.getPresetFilterItems(d.data.evidences, 'id');
      $scope.ecos = filterService.mergeRightToLeft($scope.ecos, filterItems);
    });
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.ecos), 'checked'), 'id');
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('evidenceCode', getQuery());
    $scope.$parent.addToQuery('evidenceCodeUsage', $scope.evidenceCodeUsage);
  };

  $scope.reset = function () {
    $scope.$parent.query.evidenceCode = '';
    $scope.$parent.query.evidenceCodeUsage = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.addECOs = function () {
    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea);
    var addedFilterItems = filterService.addFilterItems(ecos, validationService.validateECOTerm);
    $scope.ecos = filterService.mergeRightToLeft(addedFilterItems, $scope.ecos);
    $scope.ecoTextArea = '';
  };

  init();
});
