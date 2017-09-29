'use strict';
app.controller('TargetSetCtrl', function($scope, $routeParams, $location, $anchorScroll,
                                           presetsService, geneProductService, taxonomyService) {

  $scope.gpSetName = ($routeParams.gpSetName) ? $routeParams.gpSetName : $routeParams.id;
  $scope.location = $location.path();

  function init() {
    var gpSetPromise = presetsService.getPresetsGeneProducts();
    gpSetPromise.then(
      function(response) {
        $scope.targetSet = _.find(response.data.geneProducts, function(gp) {
          return gp.name === $scope.gpSetName;
        });
        getResultsPage();
      });
  }
  init();

  $scope.scrollTo = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    $location.hash(old);
  };

  function getResultsPage() {
    $scope.queryPromise = geneProductService.getTargetSet($scope.gpSetName);
    $scope.queryPromise.then(
      function(resp) {
        $scope.data = resp.data;
        $scope.data.hits = {};
        getTaxaForData();
        postProcessData();
      });
  }

  function postProcessData() {
    var temp = _.sortBy($scope.data.results, 'symbol');
    angular.forEach(temp, function(geneProd) {
      geneProd.symbol = geneProd.symbol.toUpperCase();
      var initial = /[A-Z]/.test(geneProd.symbol.charAt(0)) ? geneProd.symbol.charAt(0) : 'other';
      if ($scope.data.hits[initial]) {
        $scope.data.hits[initial].push(geneProd);
      } else {
        $scope.data.hits[initial] = [geneProd];
      }
    });
  }

  function getTaxaForData() {
    var taxaIds = [];
    angular.forEach($scope.data.results, function(geneProd) {
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
