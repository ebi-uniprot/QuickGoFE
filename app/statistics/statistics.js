/**
 * Created by twardell on 16/03/2015.
 */
app.controller('StatisticsCtrl', function($http, $scope, ENV, filteringService) {

 console.log("Statistics Controller");

  //The filters from the advanced filters modal dialogue, taxon checkbox, and sidebar input boxes.
  //We may arrive at this page from the statistics page (or others) so will need to load the
  //selected filters at page initialisation time.
  $scope.appliedFilters = [];
  $scope.appliedFilters = filteringService.getFilters();

  $scope.stats = {};
  $scope.statsBean={};

  loadStatistics();

  function loadStatistics() {
    var formattedURL =  ENV.apiEndpoint + '/ws/statsPostNewNamesNotSpring';

    //Create the object to send to the server
    var filterRequest = {};
    filterRequest.list = filteringService.getFilters();
    //filterRequest.rows = $scope.annotationsPerPage;
    //filterRequest.page = pageNumber;
    //filterRequest.isSlim = filteringService.isSlimming();


    // Post the filter request to the webservice
    var request = {
      method: 'POST',
      url: formattedURL,
      headers: {
        'Content-Type': 'application/json'
      },
      data: filterRequest
    };


    $scope.statsPromise = $http(request);
    $scope.statsPromise.success(function (data) {

      console.log("got the stats response back ", data);
      $scope.stats = data;
      $scope.statsBean =  $scope.stats.statsBean;
    });

  }

});
