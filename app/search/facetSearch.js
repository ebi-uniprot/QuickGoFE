'use strict';
app.controller('FacetSearchCtrl', function($scope, $location, searchService, $routeParams,
                                           taxonomyService) {

  var allFacets = [{
    'name':'Aspect',
    'id':'aspect',
    'type':'term'
  }, {
    'name':'Ontology Type',
    'id':'ontologyType',
    'type':'term'
  },{
    'name': 'Obsolete',
    'id': 'isObsolete',
    'type':'term',
  }, {
    'name':'Type',
    'id':'type',
    'type':'gp'
  }, {
    'name':'Organism',
    'id':'taxonId',
    'type':'gp'
  }, {
    'name':'UniProtKB',
    'id':'dbSubset',
    'type':'gp'
  }, {
    'name':'Proteome status',
    'id':'proteome',
    'type':'gp'
  }];

  var getFacets = function(type) {
    return _.filter(allFacets, function(d){
      return d.type === type;
    });
  };

  var type = $location.path().indexOf('searchterms') > -1 ? 'term' : 'gp';
  var facets = getFacets(type);

  $scope.taxaMapping = {};
  $scope.facetNames = {};

  _.each(facets, function(facet) {
    $scope.facetNames[facet.id] = facet.name;
  });

  $scope.maxSize = 100;
  $scope.currentPage = 1;

  $scope.searchTerm = $routeParams.searchTerm;
  $scope.filters = '';
  angular.forEach(_.pluck(facets,'id'), function(facet) {
    $scope.filters += $routeParams[facet] ? facet + '=' + $routeParams[facet] + '&' : '';
  });
  $scope.filters = $scope.filters === '' ? '' : $scope.filters.slice(0, -1);

  $scope.pagination = {
    current: 1
  };

  function sortAndTrimFacets(fields) {
    _.each(fields, function(facet) {
      // _.each($scope.results.facet.facetFields, function(facet) {
      facet.categories = _.sortBy(facet.categories, function(category) {
        return category.count;
      });
      facet.categories = _.last(facet.categories, 10).reverse();
    });
  }

  function getResultsPage(type) {
    if(type === 'term') {
      $scope.queryPromise = searchService.findTerms($scope.searchTerm, $scope.maxSize, $scope.currentPage, _.pluck(facets,'id'),
          $scope.filters);
    } else {
      $scope.queryPromise = searchService.findGeneProducts($scope.searchTerm, $scope.maxSize, $scope.currentPage,
          _.pluck(facets,'id'), $scope.filters);
    }
    $scope.queryPromise.then(
      function(result) {
        $scope.results = result.data;
        sortAndTrimFacets($scope.results.facet.facetFields);

        var taxaIds = _.uniq(_.pluck(result.data.results, 'taxonId'));
        if(type === 'gp') {
          taxaIds = taxaIds.concat(_.pluck(_.find($scope.results.facet.facetFields, function(d){
              return d.field === 'taxonId';
          }).categories,'name'));
          taxonomyService.getTaxa(taxaIds).then(function(response){
            angular.forEach(response.data.taxonomies, function(taxon) {
              $scope.taxaMapping[taxon.taxonomyId] = taxon.scientificName;
            });
          });
        }
      });
  }

  $scope.pageChanged = function() {
    getResultsPage(type);
  };

  $scope.highlight = function(text) {//TODO check this is still working
    if (!text) {
      return text;
    }
    return text.replace(
      new RegExp(searchService.escapeSearchTerm($scope.searchTerm), 'gi'),
      '<em>' + $scope.searchTerm + '</em>'
    );
  };

  getResultsPage(type);
});
