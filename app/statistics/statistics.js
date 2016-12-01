'use strict';
app.controller('StatisticsCtrl', function($scope, $routeParams, searchService) {

  $scope.stats = {
    'reference': {},
    'goId': {},
    'assignedBy': {},
    'taxonId': {},
    'evidenceCode': {},
    'aspect': {}
  };

  $scope.totalNumberAnnotations = 0;
  var query = $routeParams;

  $scope.processStatistics = function(stats) {
    angular.forEach(stats, function(item) {
      if (item.groupName === 'annotation') {
        angular.forEach(item.types, function(type) {
          $scope.stats[type.type].annotation = type.values;
        });
      } else if (item.groupName === 'geneProduct') {
        angular.forEach(item.types, function(type) {
          $scope.stats[type.type].geneProduct = type.values;
        });
      }
      $scope.totalNumberAnnotations += item.totalHits;
    });
  };

  function loadStatistics() {
    $scope.statsPromise = searchService
      .findAnnotationStatistics(searchService.serializeQuery(query));
    $scope.statsPromise.then(function(data) {
      $scope.processStatistics(data.data.results);
    });
  }

  $scope.$on('loadStatistics', function() {
    loadStatistics();
  });

});
