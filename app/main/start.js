angular.module('quickGoFeApp').controller('StartCtrl', function ($scope, $log, basketService, $location, filteringService) {

  $scope.annotationList = function () {
    filteringService.clearFilters();
    $location.path("annotations");
  }

});
