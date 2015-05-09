/**
 * Created by twardell on 27/01/2015.
 */


app.controller('AnnotationListCtrl', function($rootScope, $scope, $http, $modal, $log, basketService,
                                              hardCodedDataService, targetDomainAndPort, filteringService) {


  console.log("In the annotation list controller");
  $scope.isSlim = 0;

  $scope.annotationsPerPage=35;

  /**
   * Initialisation
   */
  $scope.annotationColumns = hardCodedDataService.getAnnotationColumns();


  //The filters from the advanced filters modal, taxon checkbox, and sidebar input boxes.
  //We may arrive at this page from the statistics page (or others) so will need to load the
  //selected filters at page initialisation time.
  $scope.appliedFilters = [];
  $scope.appliedFilters = filteringService.getFilters();

  //The raw list of filters as they come back from the advanced filters modal
  $scope.advancedFilters = {};


  $scope.countBasket = basketService.basketQuantity();
  $scope.isBasketShow = false;
  //$scope.rowsPerPage = 25; // this should match however many results your API puts on one page
  $scope.isLoading = 0;
  $scope.currentPage=1;
  getResultsPage(1);    //<--this is called instead by the page changed call

  $scope.pagination = {
    current: 1
  };


  $scope.evidenceSetter="ecoAncestorsI";

  $rootScope.header = "QuickGO::Annotation List";

  /**
   * Pick up the basket update event from the modal
   */
  $scope.$on('basketUpdate', function(event, data) { $scope.countBasket = data; });





  /**
   * ------------------------------------ Local methods --------------------------------------------------
   */


  /**
   * Get the results page
   * @param pageNumber
   */
  function getResultsPage(pageNumber) {

    $scope.currentPage = pageNumber;

    console.log(targetDomainAndPort);
    $scope.isLoading=1;

    var formattedURL=targetDomainAndPort+'/ws/annotationfiltered?';  //&q=taxonomyId:9606&page='+ pageNumber +'&rows=25';

    formattedURL=formattedURL+filteringService.createQueryString();
    $scope.isSlim = filteringService.isSlimming();
    if($scope.isSlim) {
      formattedURL = formattedURL + filteringService.createSlimString();
    }
    console.log("Query url", formattedURL);



    //todo - be able to post query so the length doesn't exceed parameter max
    //Add page and rows parameters
    formattedURL = formattedURL + '&page='+ pageNumber +'&rows='+ $scope.annotationsPerPage;

    $http.get(formattedURL).success(function(data) {
      console.log("got the response back ", data);
      $scope.goList = data;

      prettyPrintNumberAnnotations($scope.goList.numberAnnotations);

      $scope.isLoading=0;
    })
  }


  /**
   * Put commas betweenn the rather large numbers we can have here.
   */
  function prettyPrintNumberAnnotations(numberAnnotations){
    $scope.totalAnnotations = numberAnnotations.toLocaleString();

  }


  /**
   * ------------------------------------ $scope methods --------------------------------------------------
   */


  /**
   * Listen for update to the filters list (this is 'emit' from the Advanced Filters controller and the sidebar controller
   */
  $scope.$on('filtersUpdate', function(event, data) {

    //Retrieve parsed filters - we don't need to do anything with the data supplied to this function.
    $scope.appliedFilters = filteringService.getFilters();
    console.log("Loaded applied filters", $scope.appliedFilters);

    $scope.advancedFilters = data;

    //refresh the page
    getResultsPage(1);
  });



  /**
   * Listen for clearing of the filters list (this is 'emit' from the Advanced Filters controller and the sidebar controller
   */
  $scope.$on('filtersClear', function(event) {

    //Retrieve parsed filters - we don't need to do anything with the data supplied to this function.
    $scope.appliedFilters = filteringService.getFilters();
    console.log("Loaded applied filters after clearing all", $scope.appliedFilters);

    $scope.advancedFilters =  {};

    //refresh the page
    getResultsPage(1);
  });


  /**
   *
   * @param newPage
   */

  $scope.pageChanged = function(newPage) {
    console.log("Page changed", newPage);
    if($scope.currentPage!=newPage) {
      getResultsPage(newPage);
    }
  };



  /**
   * Show the basket modal on request
   */
  $scope.showBasket = function () {

    var modalInstance = $modal.open({
      templateUrl: 'modals/basketModal.html',
      controller: 'BasketCtrl',
      size: 'lg',
      scope: $scope,
      resolve: {
        countBasket: function () {
          return $scope.countBasket;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  /**
   * Add an item to the basket
   * @type {Object|Array}
   */
  $scope.addItem = function(termId, termName){
    var basketItem = {termId:termId, name:termName};
    console.log(basketService.addBasketItem(basketItem));
    $scope.countBasket = basketService.getItems().length;
  };


  /**
   * Show the basket modal on request
   */
  $scope.download = function () {

    var modalInstance = $modal.open({
      templateUrl: 'download/download.html',
      controller: 'DownloadCtrl',
      size: 'sm',
      scope: $scope
      //resolve: {
      //  countBasket: function () {
      //    return $scope.countBasket;
      //  }
      //}
    });

    modalInstance.result.then(function () {
      $log.info('Download modal dismissed at: ' + new Date());
    });
  };



  /**
   * ------------------------------------ Filtering Sidebar Code --------------------------------------------------
   */


  /**
   * Show the advanced filters modal on request
   */
  $scope.showAdvancedFilters = function () {

    var modalInstance = $modal.open({
      templateUrl: 'advancedfilters/advancedFiltersModal.html',
      controller: 'AdvancedFiltersCtrl',
      windowClass: 'app-modal-window',
      scope: $scope

    });

  };



/**
 * ------------------------------------ GO Ontology Graph Image --------------------------------------------------
 */


/**
 * Show the GO ontology graph image modal on request
 */
$scope.showOntologyGraph = function (termId, title) {

  var modalInstance = $modal.open({
    templateUrl: 'modals/ontologyGraphModal.html',
    controller: 'OntologyGraphCtrl',
    windowClass: 'app-modal-window',
    scope: $scope,
    resolve: {
      goModel: function () {
        return {id:termId, name:title};
      }
    }
  });

};


  /**
   * ------------------------------------ End of AnnotationListCtrl Controller -----------------------------------------
   */
});


/**
 * ------------------------------------ Other Controllers --------------------------------------------------
 */

app.controller('ColumnOrderCtrl', function() {
  console.log("Column Controller");
});
