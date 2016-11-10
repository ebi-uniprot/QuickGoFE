app.controller('AnnotationListCtrl', function ($rootScope, $scope, $http, $uibModal, $log, $location, $window, $routeParams,
      hardCodedDataService, dbXrefService, olsService,
      geneProductService, searchService, termService, ontoTypeService, taxonomyService) {
  /**
   * Initialisation
   */
  $scope.maxSize=25;
  $scope.evidenceSetter="ecoAncestorsI";
  $rootScope.header = "QuickGO::Annotation List";
  $scope.olsxrefs = {};

  $scope.currentPage = 1;
  getResultsPage();

  // Default visibility of columns in the results page
  $scope.columns = {
    'geneProduct':{
      'label':'Gene Product',
      'visible':true
    },
    'symbol':{
      'label':'Symbol',
      'visible':true
    },
    'qualifier':{
      'label':'Qualifier',
      'visible':true
    },
    'goIdentifier':{
      'label':'GO Term',
      'visible':true
    },
    'evidence':{
      'label':'Evidence',
      'visible':true
    },
    'reference':{
      'label':'Reference',
      'visible':true
    },
    'withFrom':{
      'label':'With / From',
      'visible':true
    },
    'taxon':{
      'label':'Taxon',
      'visible':true
    },
    'assignedBy':{
      'label':'Assigned By',
      'visible':true
    },
    'annotationExtension':{
      'label':'Annotation Extension',
      'visible':true
    },
    'database':{
      'label':'Database',
      'visible':false
    },
    'date':{
      'label':'Date',
      'visible':false
    },
    'name':{
      'label':'Name',
      'visible':false
    },
    'synonym':{
      'label':'Synonym',
      'visible':false
    },
    'type':{
      'label':'Type',
      'visible':false
    },
    'taxonName':{
      'label':'Taxon name',
      'visible':false
    }
  };

  function getResultsPage() {
    var query = $routeParams;
    $scope.showSlimColumns = (query.goUsage && query.goUsage === 'slim');

    $scope.resultsPromise = searchService.findAnnotations($scope.currentPage, $scope.maxSize,
        searchService.serializeQuery(query));
    $scope.resultsPromise.then(function (data) {
      console.log(data);
      $scope.goList = data.data;
      $scope.annotations = $scope.goList.results;

      prettyPrintNumberAnnotations($scope.goList.numberOfHits);
      postProcess();
      
      var ids = _.pluck($scope.annotations, 'goId');

      $scope.additionalTermsPromise = termService.getGOTerms(ids);
      $scope.additionalTermsPromise
        .then(function(moreData) {
              addInformation($scope.annotations, moreData.data.results);
            }, function (reason) {
              $scope.notFoundAdditionaTermsReason = reason;
              console.log(reason);
            }
        );
    });
  }

  function preProcess(){ //TODO when we have an alpha slimming service
    $scope.annotations = [];
    var lastAnnotation;
    angular.forEach($scope.goList.results, function(tempAnnotation){
      if(lastAnnotation && (tempAnnotation.id === lastAnnotation.id)){
          lastAnnotation.slimsList.push(tempAnnotation);
      } else {
          $scope.annotations.push(tempAnnotation);
      }
      lastAnnotation = tempAnnotation;
      if (!lastAnnotation.slimsList) {
        lastAnnotation.slimsList = [];
      }
    });
  }

  function postProcess() {
    var taxaIds = [];
    var geneProductIds = [];
      
    angular.forEach($scope.annotations, function(annotation) {
      taxaIds.push(annotation.taxonId);  
      
      var pos = annotation.geneProductId.indexOf(':');
      if (pos !== -1) {
        annotation.geneProductSimpleId = annotation.geneProductId.substring(pos+1);
        geneProductIds.push(annotation.geneProductSimpleId);
      }  
        
      _.forEach(annotation.extensions, function(d){
        _.forEach(d.connectedXrefs, function(xref){
           olsService.getTermName(xref.db, xref.id).then(function(resp){
             $scope.olsxrefs[xref.db + ':' + xref.id] = resp.data.label;
           });
        });
      });
    });
      
    postProcessTaxa(_.unique(taxaIds));
    postProcessGeneProds(_.unique(geneProductIds));
  }

  function postProcessTaxa(taxaIds) {
    $scope.taxaMapping = {};
    if (taxaIds.length !== 0) {
      var taxonomyPromise = taxonomyService.getTaxa(taxaIds);
      taxonomyPromise.then(function(multipleTaxa) {
        angular.forEach(multipleTaxa.data.taxonomies, function(taxon) {
          $scope.taxaMapping[taxon.taxonomyId] = taxon;
        });
      });
    }
  }

  function postProcessGeneProds(geneProductIds) {
    $scope.gpMapping = {};
    if (geneProductIds.length !== 0) {
      var geneProdPromise = geneProductService.getGeneProducts(geneProductIds);
      geneProdPromise.then(function(response) {
        angular.forEach(response.data.results, function(geneProd) {
          $scope.gpMapping[geneProd.id] = geneProd;
        });
      },function(reason) {
      });
    }
  }

  function addInformation(lst, moreDataLst) {
    angular.forEach(lst, function(annotation) {
      var inResult = _.find(moreDataLst, function(datum) {
        return datum.id === annotation.goId;
      });
      if (inResult) {
        annotation.goTermName = inResult.name;
        annotation.goAspect = inResult.aspect;
        annotation.goIsObsolete = inResult.isObsolete;
      }
    });
  }

  /**
   * Put commas between the rather large numbers we can have here.
   */
  function prettyPrintNumberAnnotations(numberAnnotations){
    $scope.totalItems = numberAnnotations.toLocaleString();
  }


  $scope.pageChanged = function() {
    getResultsPage();
  };

  $scope.download = function () {

    var modalInstance = $uibModal.open({
      templateUrl: 'download/download.html',
      controller: 'DownloadCtrl',
      size: 'med',
      scope: $scope
    });

    modalInstance.result.then(function () {
      $log.info('Download modal dismissed at: ' + new Date());
    });
  };

});