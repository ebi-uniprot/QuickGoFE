'use strict';
app.controller('AnnotationListCtrl', function ($rootScope, $scope, $http,$routeParams,
   olsService, geneProductService, searchService, termService, taxonomyService, $modal) {
  /**
   * Initialisation
   */
  $scope.itemsPerPage = 25;
  $scope.pageLimit = 25;
  $rootScope.header = 'QuickGO::Annotation List';
  $scope.olsxrefs = {};

  $scope.currentPage = 1;

  // Default visibility of columns in the results page
  $scope.columns = {
    'geneProduct': {
      'label': 'Gene Product',
      'visible': true
    },
    'symbol': {
      'label': 'Symbol',
      'visible': true
    },
    'qualifier': {
      'label': 'Qualifier',
      'visible': true
    },
    'goIdentifier': {
      'label': 'GO Term',
      'visible': true
    },
    'slimmedTerm': {
      'label': 'Slimmed to',
      'visible': false
    },
    'evidence': {
      'label': 'Evidence',
      'visible': true
    },
    'reference': {
      'label': 'Reference',
      'visible': true
    },
    'withFrom': {
      'label': 'With / From',
      'visible': true
    },
    'taxon': {
      'label': 'Taxon',
      'visible': true
    },
    'assignedBy': {
      'label': 'Assigned By',
      'visible': true
    },
    'annotationExtension': {
      'label': 'Annotation Extension',
      'visible': true
    },
    'date': {
      'label': 'Date',
      'visible': false
    },
    'name': {
      'label': 'Name',
      'visible': false
    },
    'synonym': {
      'label': 'Synonym',
      'visible': false
    },
    'type': {
      'label': 'Type',
      'visible': false
    },
    'taxonName': {
      'label': 'Taxon name',
      'visible': false
    }
  };

  function postProcessTaxa(taxaIds) {
    $scope.taxaMapping = {};
    if (taxaIds.length !== 0) {
      var taxonomyPromise = taxonomyService.getTaxa(taxaIds);
      taxonomyPromise.then(function (multipleTaxa) {
        angular.forEach(multipleTaxa.data.taxonomies, function (taxon) {
          $scope.taxaMapping[taxon.taxonomyId] = taxon;
        });
      });
    }
  }

  function postProcessGeneProds(geneProductIds) {
    $scope.gpMapping = {};
    if (geneProductIds.length !== 0) {
      var geneProdPromise = geneProductService.getGeneProducts(geneProductIds);
      geneProdPromise.then(function (response) {
        angular.forEach(response.data.results, function (geneProd) {
          $scope.gpMapping[geneProd.id] = geneProd;
        });
      });
    }
  }

  function postProcessGoTerms(goTermIds) {
    $scope.goTermMapping = {};

    termService.getGOTerms(goTermIds).then(function (resp) {
      angular.forEach(resp.data.results, function (goTerm) {
        $scope.goTermMapping[goTerm.id] = goTerm;
      });
    });
  }

  function postProcess() {
    var taxaIds = [];
    var geneProductIds = [];
    var goTermIds = [];

    angular.forEach($scope.annotations, function (annotation) {
      taxaIds.push(annotation.taxonId);
      goTermIds.push(annotation.goId);
      if (annotation.slimmedIds) {
        goTermIds = goTermIds.concat(annotation.slimmedIds);
      }

      var pos = annotation.geneProductId.indexOf(':');
      if (pos !== -1) {
        annotation.geneProductSimpleId = annotation.geneProductId.substring(pos + 1);
        geneProductIds.push(annotation.geneProductSimpleId);
      }

      _.forEach(annotation.extensions, function (d) {
        _.forEach(d.connectedXrefs, function (xref) {
          olsService.getTermName(xref.db, xref.id).then(function (resp) {
            $scope.olsxrefs[xref.db + ':' + xref.id] = resp.data.label;
          });
        });
      });
    });

    postProcessTaxa(_.unique(taxaIds));
    postProcessGeneProds(_.unique(geneProductIds));
    postProcessGoTerms(_.unique(goTermIds));
  }

  function getResultsPage() {
    var query = $routeParams;
    $scope.columns.slimmedTerm.visible = (query.goUsage && query.goUsage === 'slim');

    $scope.resultsPromise = searchService.findAnnotations($scope.currentPage, $scope.itemsPerPage,
      searchService.serializeQuery(query));
    $scope.resultsPromise.then(function (data) {
      $scope.goList = data.data;
      $scope.annotations = $scope.goList.results;
      $scope.totalItems = $scope.goList.numberOfHits;
      postProcess();
    });
  }

  $scope.openFromWith = function (withFrom) {
    $modal.open({
      templateUrl: 'annotationsList/withfromModal.html',
      size:'large',
      resolve: {
        withFrom: function() {
          return withFrom;
        }
      },
      controller: function($scope, $modalInstance, withFrom) {
        $scope.withFrom = withFrom;
        $scope.ok = function() {
          $modalInstance.close();
        };
      }
    });
};
$scope.openAnnoExtension = function (annoExt) {
  $modal.open({
    templateUrl: 'annotationsList/annoExtensionModal.html',
    size:'large',
    resolve: {
      annoExt: function() {
        return annoExt;
      }
    },
    controller: function($scope, $modalInstance, annoExt) {
      $scope.annoExt = annoExt;
      $scope.ok = function() {
        $modalInstance.close();
      };
    }
  });
};


  $scope.pageChanged = function () {
    getResultsPage();
  };

  $scope.getNumberOfElementsForPaging = function() {
    //The backend wants us to stop paginating after 25 pages
    if($scope.totalItems && $scope.totalItems > ($scope.pageLimit * $scope.itemsPerPage) && $scope.currentPage > 20 ) {
      return ($scope.pageLimit*$scope.itemsPerPage);
    } else {
      return $scope.totalItems;
    }
  };

  getResultsPage();
});
