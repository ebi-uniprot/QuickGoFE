'use strict';
app.controller('qualifierFilter', function($scope, hardCodedDataService, filterService, $rootScope){

  $scope.qualifiers = [];
  $scope.showAllNotQualifiers = 0;

  var initQualifiers = function() {
    $rootScope.cleanErrorMessages();

    $scope.qualifiers = filterService.getQueryFilterItems($scope.query.qualifier);
    $scope.showAllNotQualifiers = 0;

    var allQualifiers = filterService.getPresetFilterItems(hardCodedDataService.getQualifiers(), 'qualifier');
    $scope.qualifiers = filterService.mergeArrays(allQualifiers, $scope.qualifiers);
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.qualifiers), 'checked'), 'id');
  };

  $scope.selectAllNotQualifiers = function () {
    $rootScope.cleanErrorMessages();

    angular.forEach($scope.qualifiers, function(qualifier) {
      if(qualifier.item.name.lastIndexOf('NOT', 0) === 0) {
        if (!qualifier.checked) {
          $scope.updateTotalCheckedOnChange(qualifier);
        }
        qualifier.checked = true;
      }
    });
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

  initQualifiers();

});
