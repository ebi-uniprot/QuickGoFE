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
  $scope.appliedFilters = [];
  $scope.advancedFilters = {};
  $scope.countBasket = basketService.basketQuantity();
  $scope.isBasketShow = false;
  $scope.rowsPerPage = 25; // this should match however many results your API puts on one page
  $scope.isLoading = 0;
  getResultsPage(1);

  $scope.pagination = {
    current: 1
  };



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
    console.log("Filters update called in the annotation list");
    $scope.advancedFilters = data;
    getResultsPage(1);
  });


  /**
   * ------------------------------------ Local methods --------------------------------------------------
   */

  function createQueryString(){

    console.log("Building Query String", $scope.advancedFilters);
    var queryString = '';

    var targetSetQuery = '';
    if($scope.advancedFilters.dbObjectID != undefined) {
      targetSetQuery = targetSetQuery + $scope.advancedFilters.dbObjectID;
      var appliedFilter = {type: 'protein','value': $scope.advancedFilters.dbObjectID };
      $scope.appliedFilters.push(appliedFilter);
    }

    if($scope.advancedFilters.bhfucl != undefined) {
      targetSetQuery = targetSetQuery + 'BHF-UCL';
      var appliedFilter = {type: 'protein','value': 'BHF-UCL' };
      $scope.appliedFilters.push(appliedFilter);
    }

    if(targetSetQuery.length > 0){
      queryString = 'targetSet:'+ targetSetQuery;
    }

    //Place query parameter
    if(queryString.length>0){
      queryString='&q='+queryString;

    }

    return queryString;
  }


  function getResultsPage(pageNumber) {

    console.log(targetDomainAndPort);
    $scope.isLoading=1;

    var formattedURL=targetDomainAndPort+'/ws/annotationfiltered?format=json';  //&q=taxonomyId:9606&page='+ pageNumber +'&rows=25';

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

    formattedURL=formattedURL+createQueryString();
    //var filterString = filteringService.toQueryString();
    console.log("Query url", formattedURL);


    //todo - be able to post query so the length doesn't exceed parameter max
    //Add page and rows parameters
    formattedURL = formattedURL + '&page='+ pageNumber +'&rows=25';

    $http.get(formattedURL).success(function(data) {
      console.log("got the response back ", data);
      $scope.goList = data;
      $scope.isLoading=0;
    })
  }

  /**
   * ------------------------------------ $scope methods --------------------------------------------------
   */


  /**
   *
   * @param newPage
   */

  $scope.pageChanged = function(newPage) {
    getResultsPage(newPage);
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
      if(taxon.taxId=='9606'|taxon.taxId=='10090'|taxon.taxId=='10116')
        return true;
      return false;
    }
    return true;
  }


  /**
   * Remove filter from applied filters
   * @param filter
   */
  $scope.removeFilter=function(filter) {
    var filterLen = -1;
    var i;

    for (i = 0, filterLen = $scope.appliedFilters.length; i < filterLen; i++) {

      if ($scope.appliedFilters[i].key == filter.key) {

        if ($scope.appliedFilters[i].id == filter.id) {
          delete $scope.appliedFilters[i];

        }
      }
    }
  }

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
  }



  $scope.filterByTaxon = function(){

      getResultsPage(1);

  }


  /**
   * ------------------------------------ Filtering Sidebar Code --------------------------------------------------
   */


  /**
   * Show the basket modal on request
   */
  $scope.showAdvancedFilters = function () {

    var modalInstance = $modal.open({
      templateUrl: 'modals/advancedFiltersModal.html',
      controller: 'AdvancedFiltersCtrl',
      windowClass: 'app-modal-window',
      scope: $scope
      //resolve: {
      //  countBasket: function () {
      //    return $scope.countBasket;
      //  }
      //}
    });

    //modalInstance.result.then(function (selectedItem) {
    //  $scope.selected = selectedItem;
    //}, function () {
    //  $log.info('Modal dismissed at: ' + new Date());
    //});
  };


});
