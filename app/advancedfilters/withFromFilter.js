app.controller('withFromFilter', function($scope, presetsService, stringService) {

  $scope.withFrom = {};

  var init = function() {
    // Get With DBs
    var checked = [];
    if($scope.$parent.query.withFrom) {
      checked = checked.concat($scope.$parent.query.withFrom.split(','))
    }

    presetsService.getPresets().then(function(resp){
      var withDBs = _.sortBy(resp.data.withFrom, 'name');
      angular.forEach(withDBs, function(withDB){
        withDB.checked = _.contains(checked,withDB.name);
        $scope.withFrom[withDB.name] = withDB;
      });
    });

  };

  $scope.addWith = function() {
    var withs = stringService.getTextareaItemsAsArray($scope.withTextArea);
    angular.forEach(withs, function(withId){
      $scope.withFrom[withId] = {
        'name':withId,
        'checked':true
      };
    });
    $scope.withTextArea = '';
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('withFrom', getQuery());
  }

  $scope.reset = function () {
    $scope.$parent.query.withFrom = '';
  }

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.withFrom), 'checked'), 'name');
  }

  $scope.$on('applyMoreFilters', function(e) {
    $scope.apply();
  });

  $scope.$on('resetMoreFilters', function(e) {
    $scope.reset();
  });

  init();
});
