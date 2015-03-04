/**
 * Created by twardell on 27/01/2015.
 */


app.controller('AnnotationListCtrl', function($rootScope, $scope, $http, $modal, $log, basketService,
                                              hardCodedDataService, targetDomainAndPort) {


  /**
   * Initialisation
   */
  $scope.annotationColumns = hardCodedDataService.getAnnotationColumns();
  $scope.mostCommonTaxonomies = hardCodedDataService.getMostCommonTaxonomies();
  $scope.countBasket = basketService.basketQuantity();
  $scope.isBasketShow = false;
  $scope.rowsPerPage = 25; // this should match however many results your API puts on one page
  getResultsPage(1);

  $scope.pagination = {
    current: 1
  };



  $rootScope.header = "QuickGO::Annotation List";


  /**
   *
   * @param newPage
   */

  $scope.pageChanged = function(newPage) {
    getResultsPage(newPage);
  };

  function getResultsPage(pageNumber) {

    console.log(targetDomainAndPort);
    //annotationfiltered
    //var formattedURL='http://localhost:9080/ws/annotationjson?format=json&page='+ pageNumber +'&rows=25';
    //var formattedURL=targetDomainAndPort+'/ws/annotationjson?format=json&page='+ pageNumber +'&rows=25';
    //var formattedURL=targetDomainAndPort+'/ws/annotationfiltered?format=json&q=taxonomyId:9606&page='+ pageNumber +'&rows=25';

    var formattedURL=targetDomainAndPort+'/ws/annotationfiltered?format=json';  //&q=taxonomyId:9606&page='+ pageNumber +'&rows=25';

    //Add the taxon filters
    var haveTaxonFilter=0;
    angular.forEach($scope.mostCommonTaxonomies,function(aTaxon){

      if(haveTaxonFilter==0){
        formattedURL=formattedURL+'&q=taxonomyId:';
        haveTaxonFilter=1;
      }
      if(aTaxon.Selected) {
        formattedURL = formattedURL + aTaxon.taxId + '\n';
      }
    });

    //Add page and rows parameters
    formattedURL = formattedURL + '&page='+ pageNumber +'&rows=25';

    $http.get(formattedURL).success(function(data) {
      console.log("got the response back >>>>" + data);
      $scope.goList = data;
      $scope.totalAnnotations = 299000000;
    })
  }



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
   * Pick up the basket update event from the modal
   */
  $scope.$on('basketUpdate', function(event, data) { $scope.countBasket = data; });

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


});
