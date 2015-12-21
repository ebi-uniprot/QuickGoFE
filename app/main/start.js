angular.module('quickGoFeApp').controller('StartCtrl', function ($scope, $log, basketService, $location, filteringService, $sce) {

  $scope.annotationList = function () {
    filteringService.clearFilters();
    $location.path("annotations");
  };

  $scope.termsTooltip = $sce.trustAsHtml('Search for terms or gene products by using generic search keywords or an ID.');
  $scope.slimsTooltip = $sce.trustAsHtml('Create your own GO slim or use a predefined one to get a high level summary of an area of biology and generate specific views of the ontology structure/ annotation sets.');
  $scope.annoTooltip = $sce.trustAsHtml('View, filter and download sets of GO annotations.');

});
