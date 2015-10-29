/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($rootScope, $scope, $http, $q, $location, $anchorScroll, basketService,
                                    ENV, filteringService, quickGOHelperService, $document) {

  $scope.targetDomainAndPort=ENV.apiEndpoint;

  //Clear search term
  $scope.searchText ='';

  $scope.termInformation=true;

  /*Parse the url to get the termid*/
  var pathVals =$location.path().split("/");
  var termId=pathVals[(pathVals.length-1)];
  var formattedURL=ENV.apiEndpoint+'/ws/term/';

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
