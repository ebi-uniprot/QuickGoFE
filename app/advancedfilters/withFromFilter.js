'use strict';
app.controller('withFromFilter', function($scope, presetsService, stringService, validationService, filterService,
                                          $rootScope) {

  $scope.withFrom = [];

  var init = function() {
    $scope.withFrom = filterService.getQueryFilterItems($scope.query.withFrom);

    presetsService.getPresetsWithFrom().then(function(resp){
      var withDBs = _.sortBy(resp.data.withFrom, 'name');
      var withPresetItems = filterService.getPresetFilterItems(withDBs, 'name');
      $scope.withFrom = filterService.mergeRightToLeft($scope.withFrom, withPresetItems);
    });
    $rootScope.alerts = [];
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.withFrom), 'checked'), 'id');
  };

  $scope.addWith = function() {
    $rootScope.alerts = [];

    var withs = stringService.getTextareaItemsAsArray($scope.withTextArea);
    var allItems = filterService.addFilterItems(withs, validationService.validateOther);
    $scope.stackErrors(allItems.dismissedItems, 'alert', 'is not a with/from value');
    $scope.withFrom = filterService.mergeRightToLeft(allItems.filteredItems, $scope.withFrom);
    $scope.withTextArea = '';
  };

  $scope.apply = function() {
    $scope.addToQuery('withFrom', getQuery());
    $rootScope.alerts = [];
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
