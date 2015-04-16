/**
 * Created by twardell on 27/01/2015.
 */


app.controller('AnnotationListCtrl', function($rootScope, $scope, $http, $modal, $log, basketService,
                                              hardCodedDataService, targetDomainAndPort, filteringService) {


  console.log("In the annotation list controller");

  /**
   * Initialisation
   */
  $scope.annotationColumns = hardCodedDataService.getAnnotationColumns();
  $scope.mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();


  //The filters from the advanced filters modal, taxon checkbox, and sidebar input boxes.
  $scope.appliedFilters = [];

  //The raw list of filters as they come back from the advanced filters modal
  $scope.advancedFilters = {};


  $scope.countBasket = basketService.basketQuantity();
  $scope.isBasketShow = false;
  $scope.rowsPerPage = 25; // this should match however many results your API puts on one page
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
   * Listen for update to the filters list (this is 'emit' from the Advanced  Filters controller
   */
  $scope.$on('filtersUpdate', function(event, data) {

    //The filters service will now contain the filters
    console.log("Filters update called in the annotation list", data);
    filteringService.populateAppliedFilters(data);
    $scope.appliedFilters = filteringService.getFilters();
    console.log("After populating filters, loaded applied filters", $scope.appliedFilters);

    $scope.advancedFilters = data;
    getResultsPage(1);
  });


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

    //Add the taxon filters
    //var haveTaxonFilter=0;
    //angular.forEach($scope.mostCommonTaxonomies,function(aTaxon){
    //
    //  if(haveTaxonFilter==0){
    //    formattedURL=formattedURL+'taxonomyId:';
    //    haveTaxonFilter=1;
    //  }
    //  if(aTaxon.Selected) {
    //    formattedURL = formattedURL + aTaxon.taxId + '\n';
    //  }
    //});

    formattedURL=formattedURL+filteringService.createQueryString();
    //var filterString = filteringService.toQueryString();
    console.log("Query url", formattedURL);


    //todo - be able to post query so the length doesn't exceed parameter max
    //Add page and rows parameters
    formattedURL = formattedURL + '&page='+ pageNumber +'&rows=25';

    $http.get(formattedURL).success(function(data) {
      console.log("got the response back ", data);
      $scope.goList = data;

      prettyPrintNumberAnnotations($scope.goList.numberAnnotations);

      $scope.isLoading=0;
    })
  }


  /**
   *
   */
  function prettyPrintNumberAnnotations(numberAnnotations){
    $scope.totalAnnotations = numberAnnotations.toLocaleString();

  }


  /**
   * ------------------------------------ $scope methods --------------------------------------------------
   */


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
   * Show the common taxons used for filtering
   * @param taxon
   * @param showAll
   * @returns {boolean}
   */
  $scope.showCommonTaxon=function(taxon, showAll){

    if($scope.showAll==="" || $scope.showAll==='false')
    {
      //Only show selected
      return (taxon.taxId=='9606'|taxon.taxId=='10090'|taxon.taxId=='10116');
    }
    return true;
  };


  /**
   * Remove filter from applied filters
   * @param filter
   */
  $scope.removeFilter=function(filter) {
    var filterLen = -1;
    var i;

    for (i = 0  ; i < $scope.appliedFilters.length; i++) {

      if ($scope.appliedFilters[i].type == filter.type) {

        if ($scope.appliedFilters[i].value == filter.value) {
           $scope.appliedFilters.splice(i, 1);

        }
      }
    }

    //Reload the page now that we have less filters
    console.log("Reload the page now that we have less filters");
    getResultsPage(1);
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
