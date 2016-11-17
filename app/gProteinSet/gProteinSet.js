app.controller('GProteinSetCtrl', function($scope, $uibModal, $routeParams,
                                           presetsService, geneProductService, taxonomyService) {

  $scope.gpSetName = $routeParams.gpSetName;

  function init() {
    var gpSetPromise = presetsService.getPresets(); //TODO change to specific preset once available in master
    gpSetPromise.then(
      function(response) {
        $scope.gProteinSet = _.find(response.data.geneProducts, function(gp) {
          return gp.name === $scope.gpSetName;
        });
        getResultsPage();
      });
  }
  init();

  function getResultsPage() {
    $scope.queryPromise = geneProductService.getTargetSet($scope.gpSetName);
    $scope.queryPromise.then(
      function(result) {
        $scope.results = result.data;
        getTaxaForData();
      });
  }

  function getTaxaForData() {
    var taxaIds = [];
    angular.forEach($scope.results.results, function(geneProd) {
      taxaIds.push(geneProd.taxonId);
    });

    $scope.taxaMapping = {};
    if (taxaIds.length !== 0) {
      var taxonomyPromise = taxonomyService.getTaxa(_.unique(taxaIds));
      taxonomyPromise.then(function(multipleTaxa) {
        angular.forEach(multipleTaxa.data.taxonomies, function(taxon) {
          $scope.taxaMapping[taxon.taxonomyId] = taxon;
        });
      });
    }
  }
});
