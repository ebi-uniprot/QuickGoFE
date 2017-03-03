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
      'visible': true,
      'tooltip': 'The sequence IDs that have been annotated with GO Terms.'
    },
    'symbol': {
      'label': 'Symbol',
      'visible': true,
      'tooltip': 'The symbols corresponding to the Gene Product ID. An officially approved gene symbol when available or other gene symbols or locus names.'
    },
    'qualifier': {
      'label': 'Qualifier',
      'visible': true,
      'tooltip': 'Defines the relationship between Gene product and GO term.'
    },
    'goIdentifier': {
      'label': 'GO Term',
      'visible': true,
      'tooltip': 'The unique, stable identifier of the GO term.'
    },
    'slimmedTerm': {
      'label': 'Slimmed to',
      'visible': false,
      'tooltip': 'The GO term of the original annotation when annotations have been slimmed up to higher-level terms.'
    },
    'evidence': {
      'label': 'Evidence',
      'visible': true,
      'tooltip': 'GO terms are assigned to proteins based on different evidence. This is represented by an evidence code.'
    },
    'reference': {
      'label': 'Reference',
      'visible': true,
      'tooltip': 'A PubMed reference or a GO_REF identifier which contains either the data supporting the annotation or details of the electronic method applied to generate the annotation.'
    },
    'withFrom': {
      'label': 'With / From',
      'visible': true,
      'tooltip': 'An additional ID to support annotations using certain evidence codes (including IEA, IPI, IGI, IC and ISS evidences). E.g. UniProtKB:O00341, InterPro:IPROO1878 …'
    },
    'taxon': {
      'label': 'Taxon',
      'visible': true,
      'tooltip': 'The taxonomic ID for the species being annotated.'
    },
    'assignedBy': {
      'label': 'Assigned By',
      'visible': true,
      'tooltip': 'The database which created the annotation. The GO annotation may not be copied without acknowledgement of the data source.'
    },
    'annotationExtension': {
      'label': 'Annotation Extension',
      'visible': true,
      'tooltip': 'Used in conjunction with the GO term, this gives a more specific annotation'
    },
    'date': {
      'label': 'Date',
      'visible': false,
      'tooltip': 'Date on which the annotation was made'
    },
    'name': {
      'label': 'Name',
      'visible': false,
      'tooltip': 'The name of the Gene Product.'
    },
    'synonym': {
      'label': 'Synonym',
      'visible': false,
      'tooltip': 'The synonyms or gene symbols associated with the protein.'
    },
    'type': {
      'label': 'Type',
      'visible': false,
      'tooltip': 'The type of gene product that has been annotated.'
    },
    'taxonName': {
      'label': 'Taxon name',
      'visible': false,
      'tooltip': 'The name of the species that matches the taxonomic identifier being annotated.'
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
      },olsxrefs: function() {
        return $scope.olsxrefs;
      }
    },
    controller: function($scope, $modalInstance, annoExt, olsxrefs) {
      $scope.olsxrefs = olsxrefs;
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
