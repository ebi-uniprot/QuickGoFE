/**
 * Created by twardell on 16/03/2015.
 */
app.controller('StatisticsCtrl', function($http, $scope, $rootScope, ENV) {
  $scope.stats = {};
  $scope.statsBean={};
  var statsLoaded = false;

  $scope.$on('loadStatistics', function() {
    loadStatistics();
  });

  function loadStatistics() {

    //Create the object to send to the server
    var filterRequest = {};
    // filterRequest.list = filteringService.populateAppliedFilters();


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

  $scope.$on('filtersUpdate', function() {
    if(statsLoaded) {
      loadStatistics();
    }
  });

});
