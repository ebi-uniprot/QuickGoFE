/**
 * Created by twardell on 27/01/2015.
 */



app.controller('AnnotationListCtrl', function($rootScope, $scope, $http, $uibModal, $log, $location, $window,
                                              hardCodedDataService, dbXrefService, filteringService, olsService, ENV) {


  /**
   * Initialisation
   */
  $scope.maxSize=25;
  //$scope.annotationColumns = hardCodedDataService.getAnnotationColumns();

  //Search filters applied to see if the flag for "slim" is set. If true, extra columns will be shown
  // $scope.showSlimColumns = filteringService.hasSlims();

  $scope.evidenceSetter="ecoAncestorsI";
  $rootScope.header = "QuickGO::Annotation List";

  $scope.currentPage = 1;
  getResultsPage();



  // Default visibility of columns in the results page
  $scope.colGeneProduct = true;
  $scope.colSymbol = true;
  $scope.colQualifier = true;
  $scope.colGOIdentifier = true;
  // $scope.colOrigID = false;
  // $scope.colSlimmedGOTerm = false;
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

  /**
   * Get the results page - Post version
   */
  function getResultsPage() {

    //Create the object to send to the server
    var filterRequest = {};
    filterRequest.list =  filteringService.populateAppliedFilters();
    filterRequest.rows =  $scope.maxSize;
    filterRequest.page = $scope.currentPage;

    // Post the filter request to the webservice
    var request = {
      method: 'POST',
      url: ENV.apiEndpoint + '/annotationPostNewNamesNotSpring',
      headers: {
        'Content-Type': 'application/json'
      },
      data: filterRequest
    };
    $scope.resultsPromise = $http(request);
    $scope.resultsPromise.then(function successCallback(data) {
      $scope.goList = data.data;
      $scope.goListProcessed = preProcess($scope.goList);
      prettyPrintNumberAnnotations($scope.goList.numberAnnotations);
    }, function errorCallback(response) {
      if(response.status === 400) {
        handleServerError(response.data);
      }
    });
    $scope.showSlimColumns = filteringService.hasSlims();
  }

  function preProcess(data){
    $scope.annotations =[];
    var lastAnnotation;
    angular.forEach(data.annotationsList, function(tempAnnotation){
      if(lastAnnotation && (tempAnnotation.id === lastAnnotation.id)){
          lastAnnotation.slimsList.push(tempAnnotation);
      } else {
          $scope.annotations.push(tempAnnotation)
      }
      lastAnnotation = tempAnnotation;
      if (!lastAnnotation.slimsList) {
        lastAnnotation.slimsList = [];
      }
    });

  }

  function handleServerError(error) {
    $scope.addAlert = function() {
      $scope.alerts.push({msg: error.message});
    };
    filteringService.clearFilters();
    $rootScope.$broadcast('filtersUpdate');
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


  /**
   * Listen to an update to the filters list that comes from the typeahead function
   */
  $scope.$on('filtersUpdate', function() {
    $scope.currentPage=1;
    getResultsPage(1);
  });

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

  $scope.showTaxon = function(target) {
    $window.open('http://www.uniprot.org/taxonomy/'+target, '_blank');
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
  }


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
