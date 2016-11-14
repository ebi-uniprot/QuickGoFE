'use strict';
app.controller('qualifierFilter', function($scope, hardCodedDataService){

  $scope.qualifiers = {};
  $scope.showAllNotQualifiers = 0;

  var initQualifiers = function() {
    var checked = [];
    if($scope.query.qualifier) {
      checked = checked.concat($scope.query.qualifier.split(','));
    }
    angular.forEach(hardCodedDataService.getQualifiers(), function(qualifier) {
      qualifier.checked = _.contains(checked, qualifier.qualifier);
      $scope.qualifiers[qualifier.qualifier] = qualifier;
    });
  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.qualifiers), 'checked'), 'qualifier');
  };

  $scope.selectAllNotQualifiers = function () {
    angular.forEach($scope.qualifiers, function(qualifier, name) {
      if(name.lastIndexOf('NOT', 0) === 0) {
        $scope.qualifiers[name].checked  = true;
      }
    });
  };

  $scope.apply = function() {
    $scope.addToQuery('qualifier', getQuery());
  };

  $scope.reset = function () {
    $scope.query.qualifier = '';
  };

  $scope.$on('applyMoreFilters', function() {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function() {
    $scope.reset();
  });

  initQualifiers();

});
