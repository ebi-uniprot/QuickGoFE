/**
 * Created by twardell on 16/03/2015.
 */
app.controller('StatisticsCtrl', function($http, $scope, $rootScope, ENV,
  filteringService) {
  $scope.stats = {};
  $scope.statsBean={};
  var statsLoaded = false;

  $scope.$on('loadStatistics', function(event) {
    loadStatistics();
  });

  function loadStatistics() {

    //Create the object to send to the server
    var filterRequest = {};
    filterRequest.list = filteringService.populateAppliedFilters();


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

  $rootScope.$on('filtersUpdate', function(event) {
    if(statsLoaded) {
      loadStatistics();
    }
  });

});
