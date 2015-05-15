/**
 * Created by twardell on 10/02/2015.
 */
app.controller('ChildTermsGraphCtrl', function($scope, $http, targetDomainAndPort) {


  var formattedURL=targetDomainAndPort+'/ws/ontologyGraph/';
  var termId='GO:0003824';

  /**
   * Get Term Data from WS
   */
  //$http.get(formattedURL+termId).success(function(data) {
  //  $scope.termGraphImageSrc = data;
  //  console.log("termGraphImageSrc",$scope.termGraphImageSrc);
  //
  //});

});
