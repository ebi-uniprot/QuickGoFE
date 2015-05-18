/**
 * Created by twardell on 10/02/2015.
 */
app.controller('ChildTermsCtrl', function($scope, $http, targetDomainAndPort) {

  console.log("In child terms page");

  var pathVals =$location.path().split("/");
  //var termId=pathVals[(pathVals.length-1)];

  console.log("In AncestorsGraphCtrl");
  $scope.isLoading = 1;
  $scope.term = {};
  $scope.term.id =pathVals[(pathVals.length-1)];
  $scope.imageSource="";


  var formattedURL=targetDomainAndPort+'/ws/ontologyGraph/';

  /**
   * Get Term Data from WS
   */
  $http.get(formattedURL+$scope.term.id).success(function(data) {
    console.log("Got term data", data);

  });

});
