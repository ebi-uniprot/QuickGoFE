/**
 * Created by twardell on 16/03/2015.
 */
app.controller('StatisticsCtrl', function($http, $scope, ENV, filteringService) {
  //The filters from the advanced filters modal dialogue, taxon checkbox, and sidebar input boxes.
  //We may arrive at this page from the statistics page (or others) so will need to load the
  //selected filters at page initialisation time.
  $scope.appliedFilters = [];
  $scope.appliedFilters = filteringService.getFilters();

  $scope.stats = {};
  $scope.statsBean={};
  var statsLoaded = false;

  $scope.$on('loadStatistics', function(event) {
    loadStatistics();
  });

  function loadStatistics() {
    //var formattedURL =  ENV.apiEndpoint + '/statsPostNewNamesNotSpring';

    //Create the object to send to the server
    var filterRequest = {};
    filterRequest.list = filteringService.getFilters();


    // Post the filter request to the webservice
    var request = {
      method: 'POST',
      url: ENV.apiEndpoint + '/statsPostNewNamesNotSpring',
      headers: {
        'Content-Type': 'application/json'
      },
      data: filterRequest
    };


    $scope.statsPromise = $http(request);
    $scope.statsPromise.success(function (data) {
      $scope.stats = data;
      statsLoaded = true;
    });

  }

  $scope.$on('filtersUpdate', function(event) {
    if(statsLoaded) {
      loadStatistics();
    }
  });

  $scope.$on('filtersClear', function(event) {
    if(statsLoaded) {
      $scope.appliedFilters = filteringService.getFilters();
      $scope.advancedFilters =  {};
      loadStatistics();
    }
  });

});
