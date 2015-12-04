app.controller('FacetSearchCtrl', function($scope, $location, $uibModal, searchService, $routeParams) {

  var isTermSearch = $location.path().indexOf('searchterms') > -1;

  if(isTermSearch) {
    var facets = 'ontology,isObsolete';
  } else {
    var facets = ''
  }
  $scope.maxSize = 25;
  $scope.currentPage = 1;

  $scope.searchTerm = $routeParams.searchTerm;
  filters = $routeParams.filters ? $routeParams.filters : '';

  $scope.pagination = {
    current: 1
  };

  function getResultsPage() {
    if(isTermSearch) {
      $scope.queryPromise = searchService.findTerms($scope.searchTerm, $scope.maxSize, $scope.currentPage, facets, filters);
    } else {
      $scope.queryPromise = searchService.findGeneProducts($scope.searchTerm, $scope.maxSize, $scope.currentPage, facets, filters);
    }
    $scope.queryPromise.then(
      function(result) {
        $scope.results = result.data;
      });
  }

  $scope.pageChanged = function() {
    getResultsPage();
  };

  $scope.getFilterUrl = function(field, category) {
    return  ((filters && filters.length > 0) ? filters + ',' : '') + field + ':' + category;
  }

  $scope.isSelected = function(field, category) {
    return filters.indexOf(field + ':' + category) > -1;
  }

  $scope.highlight = function(text) {
    if (!text) {
      return text;
    }
    var newText = text.replace(new RegExp($scope.searchTerm, 'gi'), "<span class='highlighted'>" + $scope.searchTerm + "</span>");
    return newText;
  }

  getResultsPage();

});