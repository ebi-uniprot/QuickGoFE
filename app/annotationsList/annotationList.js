app.controller('AnnotationListCtrl', function($rootScope, $scope, $http, $uibModal, $log, $location, $window, $routeParams,
                                              hardCodedDataService, dbXrefService, olsService,
                                              searchService, termService, ontoTypeService, taxonomyService) {

  /**
   * Initialisation
   */
  $scope.maxSize=25;
  $scope.evidenceSetter="ecoAncestorsI";
  $rootScope.header = "QuickGO::Annotation List";

  $scope.currentPage = 1;
  getResultsPage();

  // Default visibility of columns in the results page
  $scope.colGeneProduct = true;
  $scope.colSymbol = true;
  $scope.colQualifier = true;
  $scope.colGOIdentifier = true;
  $scope.colEvidence = true;
  $scope.colReference = true;
  $scope.colWith = true;
  $scope.colTaxon = true;
  $scope.colAssignedBy = true;
  $scope.colAnnotationExtension = true;
  $scope.colDatabase = false;
  $scope.colDate = false;
  $scope.colName = false;
  $scope.colSynonym = false;
  $scope.colType = false;
  $scope.colTaxonName = false;
  $scope.colSequence = false;

  function getResultsPage() {
    var query = $routeParams;
    // $scope.showSlimColumns = filteringService.hasSlims();

    $scope.resultsPromise = searchService.findAnnotations($scope.currentPage, $scope.maxSize, searchService.serializeQuery(query));
    $scope.resultsPromise.then(function (data) {
      $scope.goList = data.data;
      if ($scope.showSlimColumns) {
        //preProcess(); //TODO check the preprocess code once the alpha slimming service response is known and working
      } else {
        $scope.annotations = $scope.goList.results;
      }
      prettyPrintNumberAnnotations($scope.goList.numberOfHits);
      postProcess();

      $scope.additionalTermsPromise = termService.getTerms($scope.annotations, true, 'goId');
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
    angular.forEach($scope.annotations, function(annotation) {
      var pos = annotation.geneProductId.indexOf(':');
      if (pos !== -1) {
        annotation.database = annotation.geneProductId.substring(0, pos);
      } else {
        annotation.database = '';
      }
      taxaIds.push(annotation.taxonId);
    });
    postProcessTaxa(_.unique(taxaIds));
  }

  function postProcessTaxa(taxaIds) {
    taxonomyService.completeTaxaInfo(taxaIds, $scope.annotations);
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


  /**
   * ------------------------------------ $scope methods --------------------------------------------------
   */

  $scope.ontoOneLetterName = function(ontoName) {
    return ontoTypeService.ontoOneLetterName(ontoName);
  };

  /**
   * Listen to an update to the filters list that comes from the typeahead function
   */
//  $scope.$on('filtersUpdate', function() {
//    $scope.currentPage=1;
//    getResultsPage(1);
//  });

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

  /**
   * Show the with_string modal on request
   */
  $scope.showWithList = function (withList) {

    $scope.withList = withList;

    $uibModal.open({
      templateUrl: 'annotationsList/withStringModal.html',
      controller: 'AnnotationListModalController',
      size: 'md',
      scope: $scope
    });

  };

  $scope.showAnnotationExtension = function(extensions) {
    //TODO, do we really have a connectedXrefs element or just the elements? And what info per element?
    angular.forEach(extensions, function(extension){
      angular.forEach(extension.connectedXrefs, function(xref){
        olsService.getTermName(xref).then(function(name){
          xref.label = name.data.label;
        });
      });
    });
    $scope.extensions = extensions;

    $uibModal.open({
      templateUrl: 'annotationsList/annotationExtensionModal.html',
      controller: 'AnnotationListModalController',
      size: 'md',
      scope: $scope
    });
  };

  $scope.customiseColumnsContainer = true;
  $scope.toggleCustomiseContainer = function() {
       $scope.customiseColumnsContainer = $scope.customiseColumnsContainer === false ? true : false;
  };


  /**
   * ------------------------------------ Evidence Code Graph Image --------------------------------------------------
   */


  /**
   * Show the GO ontology graph image modal on request
   */
  $scope.showEvidenceCodeOntologyGraph = function (ecoId) {

    $uibModal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function () {
          return {id:ecoId, name:'', scope:'ECO'};
        }
      }
    });

  };


});

app.controller('ColumnOrderCtrl', function() {
});
