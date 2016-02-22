/**
 * Created by twardell on 16/03/2015.
 */
app.controller('StatisticsCtrl', function($http, $scope, $rootScope, ENV, filteringService) {

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
    var formattedURL =  ENV.apiEndpoint + '/statsPostNewNamesNotSpring';

    //Create the object to send to the server
    var filterRequest = {};
    filterRequest.list = filteringService.getFilters();


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

      $scope.stats = data;
      //$scope.statsBean =  $scope.stats.statsBean;
    });

  }

  $rootScope.$on('filtersUpdate', function(event) {
    loadStatistics();
  });

  $rootScope.$on('filtersClear', function(event) {
    $scope.appliedFilters = filteringService.getFilters();
    $scope.advancedFilters =  {};
    loadStatistics();
  });

});
