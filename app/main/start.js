angular.module('quickGoFeApp').controller('StartCtrl', function ($scope, $log, basketService, $location, filteringService, $sce) {

  $scope.annotationList = function () {
    filteringService.clearFilters();
    $location.path("annotations");
  };

  $scope.termsTooltip = $sce.trustAsHtml('<strong>Search for Terms</strong><p>Use this section to directly search for terms using a QuickGo ID, or by using more generic search terms to select from a drop down list or result screen.');
  $scope.slimsTooltip = $sce.trustAsHtml('<strong>Investigate GO slims</strong><p>Use this option to find out how to create your own GO slim, or use the predefined GO slims to generate specific views of the ontology structure, or annotation sets.');
  $scope.annoTooltip = $sce.trustAsHtml('<strong>GO Annotations</strong><p>Use this option to view, filter and download sets of GO annotations. <p>QuickGO enables you to filter annotation sets with specific gene or protein identifiers, GO term identifiers, taxonomic identifiers or evidence codes. <p>This page also offers you the ability to map between different sequence identifier types (e.g. UniProtKB, Ensembl, RefSeq or MGI identifiers), and to download annotation data.');
  $scope.toolboxTooltip = $sce.trustAsHtml('<strong>Toolbox</strong><p>Click the toolbox icon to view the version of Ontology currently used</a>  <p>Hostname:<br />ves-pg-cf.ebi.ac.uk<p>Up since:<br />09:27 23/11/2015 <p>Stamp:<br />2015-11-26-02-52-54 <p>Version: 48');

});
