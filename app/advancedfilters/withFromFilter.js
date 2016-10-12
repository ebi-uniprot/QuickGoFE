app.controller('withFromFilter', function($scope) {

  var init = function() {
    // Get With DBs
    _filters.with = {};
    var resultWDB = withDBs.query();
    resultWDB.$promise.then(function(data){
      var withDBs = _.sortBy(data, 'dbId');
      angular.forEach(withDBs, function(withDB){
        _filters.with[withDB.dbId] = false;
        _namesMap[withDB.dbId] = withDB.xrefDatabase;
      });
    });
  };

  $scope.addWith = function() {
    var withs = stringService.getTextareaItemsAsArray($scope.withTextArea);
    angular.forEach(withs, function(withId){
      $scope.filters.with[withId] = true;
    });
    $scope.withTextArea = '';
  };
});
