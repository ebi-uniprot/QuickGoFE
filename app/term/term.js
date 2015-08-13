/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($rootScope, $scope, $http, $modal, $q, $location, $anchorScroll, basketService,
                                    targetDomainAndPort, filteringService) {

  //Clear search term
  $scope.searchText ='';

  console.log("Term Controller");

  $scope.isLoading=1;
  $scope.termInformation=true;

  /*Parse the url to get the termid*/
  var pathVals =$location.path().split("/");
  var termId=pathVals[(pathVals.length-1)];
  var formattedURL=targetDomainAndPort+'/ws/term/';

  $rootScope.header = "QuickGO::Term "+termId;

  //Setup and easy flag to see if this is a goterm or and ECO code we are looking at.
  if(termId.lastIndexOf('ECO', 0) === 0){
    $scope.isGoTerm=0;
  }else{
    $scope.isGoTerm=1;
  }


  var termUrl = formattedURL+termId;
  console.log("Getting the termUrl", termUrl);


  /**
   * Get Term Data from WS
   */
  $http.get(termUrl).success(function(data) {
    $scope.termModel = data;
    $scope.isLoading=0;
    console.log("Got Term model", $scope.termModel);

    //setupBasketButton($scope.termModel);
    $scope.preventAddToBasket = basketService.containsItem(termId) || $scope.termModel.active == false;
    console.log("The prevent add to basket is " + $scope.preventAddToBasket);


    //Set active show
    if($scope.termModel.active != true){
      $scope.isObsolete = true;
    }


    //Set restrictions show
    if($scope.termModel.usage != 'U' && $scope.termModel.goTerm){
      $scope.showRestrictions = true;
    }


    //Set up statistics for co-occurring page
    $scope.totalTogetherAllStats=0;
    $scope.totalComparedAllStats=0;
    var i=-1;
    for(i=0; i< $scope.termModel.allCoOccurrenceStatsTerms.length; i++){
      $scope.totalTogetherAllStats = $scope.totalTogetherAllStats + $scope.termModel.allCoOccurrenceStatsTerms[i].together;
      $scope.totalComparedAllStats = $scope.totalTogetherAllStats + $scope.termModel.allCoOccurrenceStatsTerms[i].compared;
    }

    $scope.totalTogetherNonIEAStats=0;
    $scope.totalComparedNonIEAStats=0;
    var i=-1;
    for(i=0; i< $scope.termModel.nonIEACOOccurrenceStatistics.length; i++){
      $scope.totalTogetherNonIEAStats = $scope.totalTogetherNonIEAStats + $scope.termModel.nonIEACOOccurrenceStatistics[i].together;
      $scope.totalComparedNonIEAStats = $scope.totalComparedNonIEAStats + $scope.termModel.nonIEACOOccurrenceStatistics[i].compared;
    }


  });


  /**
   * ---------------------------------------------- Scope methods ----------------------------------------------------
   */


  /**
   * Add an item to the basket
   * @type {Object|Array}
   */
  $scope.addToBasket = function(termId, termName){
    var basketItem = {termId:termId, name:termName};
    console.log(basketService.addBasketItem(basketItem));

    $scope.$emit('basketUpdate', basketService.basketQuantity());

    //Update the addToBasketButton
    $scope.preventAddToBasket = true;

  };

  // Control the scrolling to anchors from sidebar -> elements of the term page
  // https://docs.angularjs.org/api/ng/service/$anchorScroll
  $scope.scrollTo = function(id) {

    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();

    //reset to old to keep any additional routing logic from kicking in
    $location.hash(old);

  };


  /**
   * Take the user to the annotation list page, where the results are filtered only by this term id.
   * @param termId
   */
  $scope.showTermAnnotations = function(termId){

    console.log("filter annotations by term ", termId);

    filteringService.clearFilters();

    //Create model to hold the term id to be filtered
    var advancedFilters = {};
    advancedFilters.text = {};
    advancedFilters.text.goID = termId;

    filteringService.populateAppliedFilters(advancedFilters);

    //Now go back to the annotation list
    $location.path("annotations");

  }



  $scope.showCategoryTerm=true;
  $scope.showCategoryDefinitions=true;
  $scope.showCategoryRelationships=true;
  $scope.showCategoryOther=true;
  $scope.showCategoryCrossReferences=true;
  $scope.showCategoryObsoletions=true;


  /**
   * There maybe a change to the basket list - deletion for example of the term currently displayed, so pick up these
   * changes emitted from the basket code.
   * Pick up the basket update event from the modal
   */
  $rootScope.$on('basketUpdate', function(event, data) {
    $scope.preventAddToBasket = basketService.containsItem(termId) || $scope.termModel.active == false;
  });

  $scope.showChangeLogRow = function(category) {
    console.log("In show change log row");

    if (category == 'TERM' && $scope.showCategoryTerm) {
      return true;
    }

    if (category == 'DEFINITION' && $scope.showCategoryDefinitions) {
      return true;
    }

    if ((category == 'RELATION' || category == 'SYNONYM') && $scope.showCategoryRelationships) {
      return true;
    }

    if (category == 'OTHER' && $scope.showCategoryOther) {
      return true;
    }

    if (category == 'XREF' && $scope.showCategoryCrossReferences) {
      return true;
    }

    if (category == '???' && $scope.showCategoryObsoletions) {
      return true;
    }

    return false;

  }

});
