app.controller('qualifierFilter', function($scope, hardCodedDataService){

  $scope.qualifiers = {};
  $scope.showAllNotQualifiers = 0;

  var initQualifiers = function() {
    var checked = [];
    if($scope.$parent.query.qualifier) {
      checked = checked.concat($scope.$parent.query.qualifier.split(','))
    }
    angular.forEach(hardCodedDataService.getQualifiers(), function(qualifier) {
      qualifier.checked = _.contains(checked, qualifier.qualifier);
      $scope.qualifiers[qualifier.qualifier] = qualifier;
    });
  }

  $scope.selectAllNotQualifiers = function () {
    angular.forEach($scope.qualifiers, function(qualifier) {
      if(qualifier.qualifier.startsWith('NOT'))
      $scope.filters.qualifier[qualifier.qualifier] = true;
    });
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('qualifier', getQuery());
  }

  $scope.reset = function () {
    $scope.$parent.query.qualifier = '';
  }

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.qualifiers), 'checked'), 'name');
  }

  $scope.$on('applyMoreFilters', function(e) {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function(e) {
    $scope.reset();
  });

  initQualifiers();

});
