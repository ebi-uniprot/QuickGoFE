/**
 * Created by twardell on 27/01/2015.
 */


app.controller('AnnotationListCtrl', function($rootScope, $scope, $http, $modal, $log, $location, $window, basketService,
                                              hardCodedDataService, targetDomainAndPort, filteringService) {


  /**
   * Initialisation
   */

  //console.log("In the annotation list controller");
  $scope.isSlim = 0;
  $scope.annotationsPerPage=25;
  $scope.annotationColumns = hardCodedDataService.getAnnotationColumns();

  //The filters from the advanced filters modal, taxon checkbox, and sidebar input boxes.
  //We may arrive at this page from the statistics page (or others) so will need to load the
  //selected filters at page initialisation time.
  $scope.appliedFilters = [];
  $scope.appliedFilters = filteringService.getFilters();

  //The raw list of filters as they come back from the advanced filters modal
  $scope.advancedFilters = {};

  $scope.evidenceSetter="ecoAncestorsI";
  $rootScope.header = "QuickGO::Annotation List";

  $scope.isLoading = true;
  $scope.currentPage=1;
  getResultsPage(1);    //<--this is called instead by the page changed call

  $scope.pagination = {
    current: 1
  };


  /**
   * ------------------------------------ Local methods --------------------------------------------------
   */


  /**
   * Get the results page
   * @param pageNumber
   */
  function getResultsPageY(pageNumber) {

    $scope.currentPage = pageNumber;

    console.log(targetDomainAndPort);
    $scope.isLoading=true;

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

      $scope.isLoading=false;
    })

  }


  /**
   * Get the results page - Post version
   * @param pageNumber
   */
  function getResultsPage(pageNumber) {
    $scope.isLoading=true;

    //var formattedURL=targetDomainAndPort+'/ws/annotationPostNewNames';
    var formattedURL=targetDomainAndPort+'/ws/annotationPostNewNamesNotSpring';
    console.log("formatted url", formattedURL);


    //Create the object to send to the server
    var filterRequest = {};
    filterRequest.list =  filteringService.getFilters();
    filterRequest.rows =  $scope.annotationsPerPage;
    filterRequest.page = pageNumber;
    filterRequest.isSlim = filteringService.isSlimming();


    // Post the filter request to the webservice
    var request = {
      method: 'POST',
      url: formattedURL,
      headers: {
        'Content-Type': 'application/json'
      },
      data: filterRequest
    };


    $http(request).success(function(data) {

      console.log("got the response back ", data);
      $scope.goList = data;


      prettyPrintNumberAnnotations($scope.goList.numberAnnotations);

      $scope.isLoading=false;

    })

  }


  /**
   * Put commas between the rather large numbers we can have here.
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
  $scope.$on('filtersUpdate', function(event) {

    //Retrieve parsed filters - we don't need to do anything with the data supplied to this function.
    $scope.appliedFilters = filteringService.getFilters();
    console.log("Loaded applied filters", $scope.appliedFilters);

    //refresh the page
    getResultsPage(1);
  });


  /**
   * Listen to an update to the filters list that comes from the typeahead function
   */
  $rootScope.$on('filtersUpdate', function(event) {

    //Retrieve parsed filters - we don't need to do anything with the data supplied to this function.
    $scope.appliedFilters = filteringService.getFilters();
    console.log("Loaded applied filters", $scope.appliedFilters);

    //$scope.advancedFilters = data;

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
      $scope.currentPage=newPage;
    }
  };


  /**
   * Add an item to the basket
   * @type {Object|Array}
   */
  $scope.addToBasket = function(termId, termName){
    var basketItem = {termId:termId, name:termName};
    console.log(basketService.addBasketItem(basketItem));
    //$scope.countBasket = basketService.getItems().length;

    //change the class of the basket icon to show the go term has been added to the basket.
    //angular.element('goterm-'+termId).addClass("alllign");

    $scope.$emit('basketUpdate', basketService.basketQuantity());

  };



  /**
   * Remove item from the basket
   * @type {Object|Array}
   */
  $scope.removeFromBasket = function(termId, termName){
    var basketItem = {termId:termId, name:termName};
    console.log(basketService.removeBasketItem(basketItem));
    $scope.$emit('basketUpdate', basketService.basketQuantity());

  };

  /**
   * Check if the go term is in the basket
   * @type {Object|Array}
   */
  $scope.isInBasket = function(termId){
    console.log("Testing to see if this is in the basket", termId);

    var isInBasket = basketService.containsGoTerm(termId);
    console.log("is this item in the basket", isInBasket);

     return !isInBasket;
  };



  /**
   * Show the basket modal on request
   */
  $scope.download = function () {

    var modalInstance = $modal.open({
      templateUrl: 'download/download.html',
      controller: 'DownloadCtrl',
      size: 'med',
      scope: $scope
    });

    modalInstance.result.then(function () {
      $log.info('Download modal dismissed at: ' + new Date());
    });
  };


  $scope.showAssignedBy = function(target) {
    console.log("show assigned by",target);
    if (target==='InterPro') {
      $window.open('http://www.ebi.ac.uk/interpro/', '_blank');
    }
    if (target==='GOC') {
      $window.open('http://geneontology.org/', '_blank');
    }
  }


  $scope.showTaxon = function(target) {
    $window.open('http://www.uniprot.org/taxonomy/'+target, '_blank');
  }


  /**
   * Show the with_string modal on request
   */
  $scope.showWithString = function (target) {

    console.log("Target of with string is ", target);
    $scope.withString=target;

    var modalInstance = $modal.open({
      templateUrl: 'annotationsList/withStringModal.html',
      controller: 'WithStringCtrl',
      size: 'md',
      scope: $scope,
      resolve: {
        fullString: function () {
          return $scope.withString;
        }
      }
    });

    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
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
    templateUrl: 'charts/ontologyGraphModal.html',
    controller: 'OntologyGraphCtrl',
    windowClass: 'app-modal-window',
    scope: $scope,
    resolve: {
      graphModel: function () {
        return {id:termId, name:title, scope:'GO'};
      }
    }
  });

};


  /**
   * ------------------------------------ Evidence Code Graph Image --------------------------------------------------
   */


  /**
   * Show the GO ontology graph image modal on request
   */
  $scope.showEvidenceCodeOntologyGraph = function (ecoId) {

    var modalInstance = $modal.open({
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
  console.log("Column Controller");
});
