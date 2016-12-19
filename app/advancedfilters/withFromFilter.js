'use strict';
app.controller('withFromFilter', function($scope, presetsService, stringService) {

  $scope.withFrom = {};

  var init = function() {
    $scope.withFrom = {};
    // Get With DBs
    if($scope.query.withFrom) {
      angular.forEach($scope.query.withFrom.split(','), function(item) {
        $scope.withFrom[item] = {
          'name':item,
          'checked':true
        };
      });
    }

    presetsService.getPresetsWithFrom().then(function(resp){
      var withDBs = _.sortBy(resp.data.withFrom, 'name');
      angular.forEach(withDBs, function(withDB){
        withDB.checked = _.contains(_.keys($scope.withFrom), withDB.name);
        $scope.withFrom[withDB.name] = withDB;
      });
    });

  };

  var getQuery = function() {
    return _.pluck(_.filter(_.values($scope.withFrom), 'checked'), 'name');
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
