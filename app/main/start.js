angular.module('quickGoFeApp').controller('StartCtrl', function ($scope, $modal, $log, basketService, $location, filteringService) {

  $scope.annotationList = function () {
    console.log("stuff");
    filteringService.clearFilters();
    $location.path("annotations");
  }

});
