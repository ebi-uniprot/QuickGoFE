app.controller('FacetSearchCtrl', function($rootScope, $scope, $location, searchService, ontoTypeService, $routeParams,
                                           taxonomyService) {

  var isTermSearch = $location.path().indexOf('searchterms') > -1;
  var facets;
  if(isTermSearch) {
    facets = 'aspect,ontologyType';
  } else {
    facets = 'type,taxonId,dbSubset'
  }
  $scope.maxSize = 25;
  $scope.currentPage = 1;
  $rootScope.fullWidthPage = true;

  $scope.searchTerm = $routeParams.searchTerm;
  $scope.filters = '';
  angular.forEach(facets.split(','), function(facet) {
    $scope.filters += $routeParams[facet] ? facet + '=' + $routeParams[facet] + '&' : '';
  });
  $scope.filters = $scope.filters === '' ? '' : $scope.filters.slice(0, -1);

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

  $scope.highlight = function(text) {
    if (!text) {
      return text;
    }

    return text.replace(new RegExp($scope.searchTerm, 'gi'), "<span class='highlighted'>" + $scope.searchTerm + "</span>");
  };

  getResultsPage();

  function postProcess() {
    postProcessTaxaForData();
    sortAndTrimFacets();
    addTaxaNamesToFacets();
  }

  function postProcessTaxaForData() {
    if (!isTermSearch) {
      var taxaIds = [];
      angular.forEach($scope.results.results, function(annotation) {
        taxaIds.push(annotation.taxonId);
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
  }

  function addTaxaNamesToFacets() {
    if (!isTermSearch) {
      var taxaIds = [];
      var data = _.find($scope.results.facet.facetFields, function(facet) {
        return facet.field === 'taxonId';
      });
      angular.forEach(data.categories, function (category) {
        taxaIds.push(category.name);
      });

      if (taxaIds.length !== 0) {
        var taxonomyPromise = taxonomyService.getTaxa(_.unique(taxaIds));
        taxonomyPromise.then(function(multipleTaxa) {
          angular.forEach(data.categories, function(datum) {
            var inResult = _.find(multipleTaxa.data.taxonomies, function(taxon) {
              return taxon.taxonomyId === +datum.name;
            });
            if (inResult) {
              datum.display = inResult.scientificName;
            }
          });
        });
      }
    }
  }

  function sortAndTrimFacets() {
    _.each($scope.results.facet.facetFields, function(facet) {
      facet.categories = _.sortBy(facet.categories, function(category) {
        return category.count;
      });
      facet.categories = _.last(facet.categories, 10).reverse();
    });
  }
});
