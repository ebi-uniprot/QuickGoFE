/**
 * Created by twardell on 26/02/2015.
 */
app.controller('GoTermHistoryCtrl', function($rootScope, $scope, basketService, goTermHistory) {


  //Use default
  var result = goTermHistory.query();

  result.$promise.then(function(data){
    $scope.history = data;
  });

  $rootScope.fullWidthPage = true;

});
