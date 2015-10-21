/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($rootScope, $scope, $http, $q, $location, $anchorScroll, basketService,
                                    targetDomainAndPort, feDomainAndPort, filteringService, quickGOHelperService, $document) {

  $scope.feDomainAndPort=feDomainAndPort;
  $scope.targetDomainAndPort=targetDomainAndPort;

  //Clear search term
  $scope.searchText ='';

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

  /**
   * Get Term Data from WS
   */
  $scope.termPromise = $http.get(termUrl);

  $scope.termPromise.success(function(data) {
    $scope.termModel = data;

    //setupBasketButton($scope.termModel);
    $scope.preventAddToBasket = basketService.containsItem($scope.termModel) || $scope.termModel.active == false;


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
  $scope.addToBasket = function(termId, termName, termAspectName){

    var aspect = quickGOHelperService.toAspectCode(termAspectName);


    var basketItem = {termId:termId, name:termName, aspect:aspect};
    console.log(basketService.addBasketItem(basketItem));

    $scope.$emit('basketUpdate', basketService.basketQuantity());

    //Update the addToBasketButton
    $scope.preventAddToBasket = true;

  };


  /**
   * Remove item from the basket
   * @type {Object|Array}
   */
  $scope.removeFromBasket = function(termId){
    console.log(basketService.removeBasketItemById(termId));
    $scope.$emit('basketUpdate', basketService.basketQuantity());

  };

  /**
   * Check if the go term is in the basket
   * @type {Object|Array}
   */
  $scope.isInBasket = function(termId){
    //console.log("Testing to see if this is in the basket", termId);

    var isInBasket = basketService.containsGoTerm(termId);
    //console.log("is this item in the basket", isInBasket);

    return !isInBasket;
  };


  /**
  * Deals with making the right nav menu fixed
  */
  $document.on('scroll', function() {
    var container = angular.element($document[0].querySelector('#container'));
    if(container[0].getBoundingClientRect().top <= 10) {
      angular.element($document[0].querySelector('#term-section-nav')).addClass('fixed');
    } else {
      var nav = angular.element($document[0].querySelector('#term-section-nav'));
      if(nav.hasClass('fixed')){
        nav.removeClass('fixed');
      }
    }
  });


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
