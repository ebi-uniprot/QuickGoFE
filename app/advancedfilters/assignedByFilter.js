app.controller('assignedByController', function($scope){

  filteringService.initAssignedby = function() {
    // Get Assigned DBs
    _filters.assignedby = {};
    var resultADB = assignDBs.query();
    resultADB.$promise.then(function(data){
      var assignDBs = _.sortBy(data, 'dbId');
      angular.forEach(assignDBs, function(assignDB){
        _filters.assignedby[assignDB.dbId] = false;
        _namesMap[assignDB.dbId] = assignDB.xrefDatabase;
      });
    });
  };

});
