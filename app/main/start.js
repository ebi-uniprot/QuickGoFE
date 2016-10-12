angular.module('quickGoFeApp').controller('StartCtrl', function ($scope, $rootScope, $sce) {

  $rootScope.header = "QuickGO Beta";

  $scope.termsTooltip = $sce.trustAsHtml('Search for terms or gene products by using generic search terms or a GO ID.');
  $scope.slimsTooltip = $sce.trustAsHtml('Create your own GO slim or use the predefined GO slims to get a high level summary of an area of biology and generate specific views of the ontology structure/ annotation sets.');
  $scope.annoTooltip = $sce.trustAsHtml('View, filter and download sets of GO annotations.');

});
