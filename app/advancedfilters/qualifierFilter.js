'use strict';
app.controller('qualifierFilter', function($scope, hardCodedDataService, filterService, $rootScope, presetsService){

  $scope.qualifiers = [];
  $scope.showAllNotQualifiers = 0;

  var initQualifiers = function() {
    $rootScope.cleanErrorMessages();
    $scope.showAllNotQualifiers = 0;
    presetsService.getPresetsQualifiers().then(function(resp){
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.qualifier);
      var presetFilterItems = filterService.getPresetFilterItems(_.sortBy(resp.data.qualifiers, 'name'), 'name');
      $scope.qualifiers = filterService.mergeArrays(queryFilterItems, presetFilterItems);
      $scope.subscribedFilters.qualifier = $scope.getTotalChecked();
    });
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.qualifiers), 'checked'), 'id');
  };

  $scope.selectAllNotQualifiers = function () {
    $rootScope.cleanErrorMessages();

    angular.forEach($scope.qualifiers, function(qualifier) {
      if(qualifier.item.name.toUpperCase().lastIndexOf('NOT', 0) === 0) {
        qualifier.checked = true;
      }
    });
    $scope.subscribedFilters.qualifier = $scope.getTotalChecked();
  };

  $scope.selectItem = function() {
    $scope.subscribedFilters.qualifier = $scope.getTotalChecked();
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.addToQueryAndUpdate('qualifier', getQuery());
  };

  $scope.reset = function () {
    $rootScope.cleanErrorMessages();
    $scope.query.qualifier = '';
    initQualifiers();
  };

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });


  $scope.getTotalChecked = function(){
    return _.filter($scope.qualifiers, 'checked').length;
  };

  initQualifiers();

});
