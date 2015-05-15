/**
 * Created by twardell on 16/03/2015.
 */
app.controller('StatisticsCtrl', function($http, $scope, targetDomainAndPort, filteringService) {

 console.log("Statistics Controller");
  $scope.stats = {};
  $scope.statsBean={};
  $scope.isLoading = 0;
  loadStatistics();



  function loadStatistics() {


    console.log(targetDomainAndPort);
    $scope.isLoading=1;

    var formattedURL=targetDomainAndPort+'/ws/stats?';

    //Add the taxon filters
    //var haveTaxonFilter=0;
    //angular.forEach($scope.mostCommonTaxonomies,function(aTaxon){
    //
    //  if(haveTaxonFilter==0){
    //    formattedURL=formattedURL+'taxonomyId:';
    //    haveTaxonFilter=1;
    //  }
    //  if(aTaxon.Selected) {
    //    formattedURL = formattedURL + aTaxon.taxId + '\n';
    //  }
    //});

    formattedURL=formattedURL+filteringService.createQueryString();
    console.log("Stats url", formattedURL);


    //todo - be able to post query so the length doesn't exceed parameter max

    $http.get(formattedURL).success(function(data) {
      console.log("got the stats response back ", data);
      $scope.stats = data;
      $scope.statsBean =  $scope.stats.statsBean;

      //prettyPrintNumberAnnotations($scope.goList.numberAnnotations);

      $scope.isLoading=0;
    })
  }

});
