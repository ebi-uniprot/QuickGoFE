/**
 * Created by twardell on 09/05/2015.
 */
app.controller('BookmarkCtrl', function($scope, $location,  $window, filteringService,
                                        $rootScope, $http, $modal, $log, basketService,
                                        hardCodedDataService, targetDomainAndPort) {

  console.log("In the bookmark controller");

  //The raw list of filters as they come back from the advanced filters modal
  var advancedFilters = [];
  //advancedFilters.text = {};

  // Parse the query parameters and forward to the annotation page after populating the filtering service values
  // It will be something like http://localhost:9000/#/bookmark/taxonomyId:9606,

  /*Parse the url to get the filter parameters*/
  var pathVals =$location.path().split("/");
  var filterParms=pathVals[(pathVals.length-1)];


  console.log("filter parms", filterParms);


  var args = filterParms.split(",");

  var i=-1;
  for(i=0;i<args.length;i++) {

    var singleArg = args[i];

    if (singleArg != '') {
      console.log(singleArg);
      var components = singleArg.split(":");
      var aFilter = {type: components[0], value: components[1]};
      console.log("Bookmark.js -created aFilter", aFilter);
      advancedFilters.push(aFilter);
    }

  }

  //Save the passed in parameters to the
  filteringService.simpleAppliedFilters(advancedFilters,0); //0==not a slim

  //Go to annotation list page
  //$window.location.href= "#annotations";


  /*   */

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



  $scope.evidenceSetter="ecoAncestorsI";

  $rootScope.header = "QuickGO::Annotation List";


  $scope.isLoading = 0;
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
   * Put commas between the rather large numbers we can have here.
   */
  function prettyPrintNumberAnnotations(numberAnnotations){
    $scope.totalAnnotations = numberAnnotations.toLocaleString();

  }



});
