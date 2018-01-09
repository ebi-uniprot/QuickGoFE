'use strict';
app.controller('withFromFilter', function($scope, $filter, presetsService, stringService, validationService, filterService, $rootScope) {

  $scope.withFrom = [];

  var init = function() {
    $scope.withFrom = filterService.getQueryFilterItems($scope.query.withFrom);

    presetsService.getPresetsWithFrom().then(function(resp){
      var withDBs = _.sortBy(resp.data.withFrom, 'name');
      var withPresetItems = filterService.getPresetFilterItems(withDBs, 'name');
      $scope.withFrom = filterService.mergeArrays(withPresetItems, $scope.withFrom);
      $scope.withFrom = _.sortBy($scope.withFrom, 'id');
     });
    $scope.subscribedFilters.withFrom = $scope.getTotalChecked();
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.withFrom), 'checked'), 'id');
  };

  $scope.addWith = function() {
    var withs = stringService.getTextareaItemsAsArray($scope.withTextArea);
    var allItems = filterService.validateItems(withs, validationService.validateOther);
    $rootScope.stackErrors(allItems.invalidItems, 'alert', 'is not a with/from value');
    $scope.withFrom = filterService.mergeArrays(allItems.validItems, $scope.withFrom);
    $scope.subscribedFilters.withFrom = $scope.getTotalChecked();
    $scope.withTextArea = '';
  };

  $scope.apply = function() {
    $scope.addToQueryAndUpdate('withFrom', getQuery());
  };

  $scope.reset = function () {
    $scope.query.withFrom = '';
    init();
  };

  $scope.$watch('withFrom', function() {
    $scope.subscribedFilters.withFrom = $scope.getTotalChecked();
  }, true);

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  $scope.getTotalChecked = function(){
    return _.filter($scope.withFrom, 'checked').length;
  };

  $scope.getWithFromDescription = function(withFrom) {
    if(withFrom.item) {
      return withFrom.item.description;
    }
  }

  init();
});
