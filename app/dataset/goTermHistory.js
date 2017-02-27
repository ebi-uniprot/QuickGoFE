'use strict';
app.controller('GoTermHistoryCtrl', function($scope, basketService, goTermHistory) {


  //Use default
  var result = goTermHistory.query();

  result.$promise.then(function(data){
    $scope.history = data;
  });

});
