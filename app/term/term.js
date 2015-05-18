/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($rootScope, $scope, $http, $modal, $q, $location, $anchorScroll, basketService,
                                    targetDomainAndPort, filteringService) {

  //Initialize data
  var currentdate = new Date();
  console.log("IN CONTROLLER", currentdate);
  $scope.isLoading=1;

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


  /**
   * Show basket quantity
   */
  $scope.countBasket = basketService.basketQuantity();


  /**
   * Get Term Data from WS
   */
  $http.get(formattedURL+termId).success(function(data) {
    $scope.termModel = data;
    $scope.isLoading=0;
    console.log("Got Term model", $scope.termModel);

    setupBasketButton($scope.termModel);

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
   * Do stuff for ancestor graph
   */

  //console.log("In AncestorsGraphCtrl");
  //$scope.isLoading = 1;
  //$scope.graphModel = {};
  //$scope.graphModel.id =termId;
  //
  //if(termId.lastIndexOf('ECO', 0) === 0){
  //  $scope.isGoTerm=0;
  //}else{
  //  $scope.isGoTerm=1;
  //}
  //
  //console.log("graphModel.id", $scope.graphModel);
  //
  //$scope.imageSource="";
  //$scope.targetDomainAndPort=targetDomainAndPort;
  //
  //var formattedURL;
  //if(termId.lastIndexOf('ECO', 0) === 0){
  //  formattedURL = targetDomainAndPort +'/ws/chartfull?ids='+ termId + '&scope=ECO';
  //  $scope.graphModel.scope='ECO';
  //}else{
  //  formattedURL = targetDomainAndPort +'/ws/chartfull?ids='+ termId
  //  $scope.graphModel.scope='';
  //}
  //
  //console.log("Chart Full url fasdf", formattedURL);
  //console.log("boo");
  //
  //
  //$http.get(formattedURL).success(function(data) {
  //  //console.log("got the response back ", data);
  //  $scope.isLoading=0;
  //  $scope.graphImage = data;
  //
  //  $scope.imageSource=targetDomainAndPort+$scope.graphImage.graphImageSrc;
  //
  //});
  //
  ///**
  // * Create the text for the legend popover
  // */
  //
  //
  //$scope.formattedTooltip = function (element)  {
  //
  //  var content = element;
  //  if (element == 'is_a') {
  //    content = "Term A <strong>is_a</strong> term B means that term A is a subtype of term B.<br/>For example, 'transcription' is a type of 'nucleic acid metabolic process'.";
  //  } else if (element == 'part_of') {
  //    content = "Term A <strong>part_of</strong> term B means that term A is always a part of term B.<br/>For example, 'transcription' is always a part of 'gene expression'.";
  //  } else if (element == 'regulates') {
  //    content = "Term A <strong>regulates</strong> term B means that term A regulates term B, but term B may not always be regulated by term A.";
  //  } else if (element == 'positively_regulates') {
  //    content = "A sub-relation of the 'regulates' relationship.<br/>Term A <strong>positively_regulates</strong> term B means that term B is positively regulated by term A.";
  //  } else if (element == 'negatively_regulates') {
  //    content = "A sub-relation of the 'regulates' relationship.<br/>Term A <strong>negatively_regulates</strong> term B means that term B is negatively regulated by term A.";
  //  } else if (element == 'has_part') {
  //    content = "<strong>has_part</strong> means that term B always has as part of it term A, but term A may exist independently of term B.<br/>For example, 'protein binding trancription factor activity' always has as a part of it 'protein binding' but 'protein binding' may occur independently of transcription factor activity.<br/>Note that has_part is not a transitive relationship, meaning there is NO implication that gene products annotated to term A could also be correctly associated with term B or any of its parent terms.<br/>Has_part should be read in the opposite direction to the other relationships.";
  //  } else if (element == 'occurs_in') {
  //    content = "This relation is used for inter-ontology links between the Biological Process ontology and the Cellular Component ontology, for example 'mitochondrial translation' occurs_in 'mitochondrion'.";
  //  } else if (element == 'used_in'){
  //    content = "Documentation coming shortly...";
  //  }
  //
  //  $scope.tooltip= content;
  //
  //}

  /**
   * End
   */


  /**
   * ---------------------------------------------- Scope methods ----------------------------------------------------
   */


  /**
   *
   * @param goId
   * @param termName
   */

  $scope.addItem = function(goId, termName){
    var basketItem = {goId:goId, termName:termName};
    console.log(basketService.addBasketItem(basketItem));
    $scope.countBasket =  basketService.basketQuantity();

    //Stop this item being added to the basket again
    $scope.allowAddToBasket = false;
    $scope.preventAddToBasket = true;
  }

  /**
   * Show the basket modal on request
   */
  $scope.showBasket = function () {

    var modalInstance = $modal.open({
      templateUrl: 'basket/basketModal.html',
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
      console.log('Modal dismissed at: ', new Date());
    });
  };


  /**
   * Pick up the basket update event from the modal
   */
  $scope.$on('basketUpdate', function(event, data) {

    console.log("Basket Update event has been called", event);
    console.log("Basket Update event has been called", data);

    $scope.countBasket = data;
      setupBasketButton($scope.termModel);
  });


  function setupBasketButton(termModel){
    console.log("setup basket");

      //Control if the basket shows
      if(!basketService.containsItem(termId) && termModel.active == true){
        $scope.allowAddToBasket = true;
        $scope.preventAddToBasket = false;
        console.log("display add to basket");
      }else{
        $scope.allowAddToBasket = false;
        $scope.preventAddToBasket = true;
        console.log("already in basket or obsolete");
      }
  }


  //Control the scrolling to anchors from sidebar -> elements of the term page
  $scope.scrollTo = function(id) {
    $location.hash(id);
    console.log($location.hash());
    $anchorScroll();
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
});
