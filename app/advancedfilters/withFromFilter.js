'use strict';
app.controller('withFromFilter', function($scope, presetsService, stringService, validationService, filterService) {

  $scope.withFrom = [];

  var init = function() {
    $scope.withFrom = filterService.getQueryFilterItems($scope.query.withFrom);

    presetsService.getPresetsWithFrom().then(function(resp){
      var withDBs = _.sortBy(resp.data.withFrom, 'name');
      var withPresetItems = filterService.getPresetFilterItems(withDBs, 'name');
      $scope.withFrom = filterService.mergeRightToLeft($scope.withFrom, withPresetItems);
    });

  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.withFrom), 'checked'), 'id');
  };


  $scope.addWith = function() {
    var withs = stringService.getTextareaItemsAsArray($scope.withTextArea);
    var filterItems = filterService.addFilterItems(withs, validationService.validateOther);
    $scope.withFrom = filterService.mergeRightToLeft(filterItems, $scope.withFrom);
    $scope.withTextArea = '';
  };

  $scope.apply = function() {
    $scope.addToQuery('withFrom', getQuery());
  };

  $scope.reset = function () {
    $scope.query.withFrom = '';
    init();
  };

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  init();
});
