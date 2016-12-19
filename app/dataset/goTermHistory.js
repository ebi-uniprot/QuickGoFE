/**
 * Created by twardell on 26/02/2015.
 */
app.controller('GoTermHistoryCtrl', function($scope, basketService, goTermHistory) {


  //Use default
  var result = goTermHistory.query();

  result.$promise.then(function(data){
    $scope.history = data;
  });

});
