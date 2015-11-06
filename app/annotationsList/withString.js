/**
 * Created by twardell on 27/01/2015.
 */

app.controller('WithStringCtrl', function($scope, $log, $uibModalInstance ) {


  console.log("Got with string is ", $scope.withString);
   $scope.results=[];
  $scope.clauses = $scope.withString.split('|');
  var i;
  for(i=0; i<$scope.clauses.length;i++){
    console.log("Got clause", $scope.clauses[i])

    var elements = $scope.clauses[i].split(',');

    console.log("Got elements", elements);
    $scope.results[i]=elements;
    console.log("Got data?",  $scope.results[i]);
  }

  /**
   * Close window
   */
  $scope.ok = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

