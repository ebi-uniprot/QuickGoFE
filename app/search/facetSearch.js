app.controller('FacetSearchCtrl', function($scope, $location, $uibModal, searchService, ontoTypeService, $routeParams,
                                           taxonomyService) {

  var isTermSearch = $location.path().indexOf('searchterms') > -1;
  var facets;
  if(isTermSearch) {
    facets = 'aspect,ontologyType';
  } else {
    facets = 'type,taxonId'
  }
  $scope.maxSize = 25;
  $scope.currentPage = 1;

  $scope.searchTerm = $routeParams.searchTerm;
  $scope.filters = $routeParams.filters ? $routeParams.filters : '';

  $scope.pagination = {
    current: 1
  };

  function getResultsPage() {
    if(isTermSearch) {
      $scope.queryPromise = searchService.findTerms($scope.searchTerm, $scope.maxSize, $scope.currentPage, facets,
          $scope.filters);
    } else {
      $scope.queryPromise = searchService.findGeneProducts($scope.searchTerm, $scope.maxSize, $scope.currentPage,
          facets, $scope.filters);
    }
    $scope.queryPromise.then(
      function(result) {
        $scope.results = result.data;
        postProcess();
      });
  }

  $scope.pageChanged = function() {
    getResultsPage();
  };

  $scope.isGoTerm = function(termId) {
    return ontoTypeService.isGoTerm(termId);
  };

  $scope.ontoOneLetterName = function(ontoName) {
    return ontoTypeService.ontoOneLetterName(ontoName);
  };

  $scope.highlight = function(text) {
    if (!text) {
      return text;
    }

    return text.replace(new RegExp($scope.searchTerm, 'gi'), "<span class='highlighted'>" + $scope.searchTerm + "</span>");
  };

  getResultsPage();

  function postProcess() {
    addTaxaNamesToData();
    sortAndTrimFacets();
  }

  function addTaxaNamesToData() {
    if (!isTermSearch) {
      var taxaIds = [];
      angular.forEach($scope.results.results, function (result) {
        taxaIds.push(result.taxonId);
      });

      $scope.taxaMapping = {};
      if (taxaIds.length !== 0) {
        var taxonomyPromise = taxonomyService.getTaxa(_.unique(taxaIds));
        taxonomyPromise.then(function(multipleTaxa) {

        });
      }
    }
  }

  function sortAndTrimFacets() {
    _.each($scope.results.facet.facetFields, function(facet) {
      facet.categories = _.sortBy(facet.categories, function(category) {
        return category.count;
      });
      facet.categories = _.last(facet.categories, 10);
    });
  }
});
