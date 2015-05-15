/**
 * Created by twardell on 26/02/2015.
 */
app.controller('GoTermHistoryCtrl', function($scope, goTermHistory) {


  //Use default
  var result = goTermHistory.query();

  result.$promise.then(function(data){

    $scope.history = data;
    console.log($scope.history);
  });
});

