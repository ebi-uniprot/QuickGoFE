/**
 * Created by twardell on 27/01/2015.
 */


app.controller('AnnotationListCtrl', function($rootScope, $scope, $http, $uibModal, $log, $location, $window,
                                              hardCodedDataService, dbXrefService, filteringService, ENV, $routeParams) {


  /**
   * Initialisation
   */

  $scope.isSlim = 0;
  $scope.maxSize=25;
  $scope.annotationColumns = hardCodedDataService.getAnnotationColumns();

  //The filters from the advanced filters modal dialogue, taxon checkbox, and sidebar input boxes.
  //We may arrive at this page from the statistics page (or others) so will need to load the
  //selected filters at page initialisation time.
  $scope.appliedFilters = [];
  $scope.appliedFilters = filteringService.getFilters();

  //Search filters applied to see if the flag for "slim" is set. If true, extra columns will be shown
  $scope.showSlimColumns = _.find($scope.appliedFilters, function(rw){ return rw.value == "slim" });

  //The raw list of filters as they come back from the advanced filters modal
  $scope.advancedFilters = {};

  $scope.evidenceSetter="ecoAncestorsI";
  $rootScope.header = "QuickGO::Annotation List";

  $scope.currentPage=1;
  getResultsPage();    //<--this is called instead by the page changed call

  /**
   * ------------------------------------ Local methods --------------------------------------------------
   */


  /**
   * Get the results page - Post version
   */
  function getResultsPage() {
    var formattedURL=ENV.apiEndpoint + '/ws/annotationPostNewNamesNotSpring';

    //Create the object to send to the server
    var filterRequest = {};
    filterRequest.list =  filteringService.getFilters();
    filterRequest.rows =  $scope.maxSize;
    filterRequest.page = $scope.currentPage;
    // filterRequest.isSlim = filteringService.isSlimming();

    // Post the filter request to the webservice
    var request = {
      method: 'POST',
      url: formattedURL,
      headers: {
        'Content-Type': 'application/json'
      },
      data: filterRequest
    };
    $scope.resultsPromise = $http(request);
    $scope.resultsPromise.success(function(data) {
      $scope.goList = data;
      prettyPrintNumberAnnotations($scope.goList.numberAnnotations);
    });
    $scope.showSlimColumns = _.find($scope.appliedFilters, function(rw){ return rw.value == "slim" });
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
   * Listen for update to the filters list (this is 'emit' from the Advanced Filters controller and the sidebar controller
   */
  $scope.$on('filtersUpdate', function(event) {

    //Retrieve parsed filters - we don't need to do anything with the data supplied to this function.
    $scope.appliedFilters = filteringService.getFilters();

    //refresh the page
    getResultsPage(1);
  });


  /**
   * Listen to an update to the filters list that comes from the typeahead function
   */
  $rootScope.$on('filtersUpdate', function(event) { //XAV: IS THIS STILL NEEDED?
    //Retrieve parsed filters - we don't need to do anything with the data supplied to this function.
    $scope.appliedFilters = filteringService.getFilters();
    //refresh the page
    $scope.currentPage=1;
    getResultsPage(1);
  });



  /**
   * Listen for clearing of the filters list (this is 'emit' from the Advanced Filters controller and the sidebar controller
   */
  $scope.$on('filtersClear', function(event) {

    //Retrieve parsed filters - we don't need to do anything with the data supplied to this function.
    $scope.appliedFilters = filteringService.getFilters();

    $scope.advancedFilters =  {};

    //refresh the page
    $scope.currentPage=1;
    getResultsPage(1);
  });


  /**
   *
   * @param newPage
   */

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
  }



  /**
   * Show the with_string modal on request
   */
  $scope.showWithList = function (withList) {

    $scope.withList = withList;

    var modalInstance = $uibModal.open({
      templateUrl: 'annotationsList/withStringModal.html',
      controller: 'WithStringCtrl',
      size: 'md',
      scope: $scope
    });

  };


  /**
   * ------------------------------------ Filtering Sidebar Code --------------------------------------------------
   */


  /**
   * Show the advanced filters modal on request
   */
  $scope.showAdvancedFilters = function () {

    var modalInstance = $uibModal.open({
      templateUrl: 'advancedfilters/advancedFiltersModal.html',
      controller: 'AdvancedFiltersCtrl',
      windowClass: 'app-modal-window',
      scope: $scope

    });

  };


  /**
   * ------------------------------------ Evidence Code Graph Image --------------------------------------------------
   */


  /**
   * Show the GO ontology graph image modal on request
   */
  $scope.showEvidenceCodeOntologyGraph = function (ecoId) {

    var modalInstance = $uibModal.open({
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


/**
 * ------------------------------------ End of AnnotationListCtrl Controller -----------------------------------------
 */

/**
 * ------------------------------------ Other Controllers --------------------------------------------------
 */

app.controller('ColumnOrderCtrl', function() {
});
