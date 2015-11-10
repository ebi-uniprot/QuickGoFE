/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($rootScope, $scope, $http, $q, $location, $anchorScroll, basketService,
                                    ENV, filteringService, quickGOHelperService, $document, $routeParams, termService) {

  $scope.targetDomainAndPort=ENV.apiEndpoint;

  //Clear search term
  $scope.searchText ='';

  $scope.termInformation=true;

  var termId=$routeParams.goId;
  // var formattedURL=ENV.apiEndpoint+'/ws/term/';

  $rootScope.header = "QuickGO::Term "+termId;

  //Setup and easy flag to see if this is a goterm or and ECO code we are looking at.
  if(termId.lastIndexOf('ECO', 0) === 0){
    $scope.isGoTerm=0;
  }else{
    $scope.isGoTerm=1;
  }


  // var termUrl = formattedURL+termId;

  /**
   * Get Term Data from WS
   */
  $scope.termPromise = termService.getTerm(termId);

  $scope.termPromise.then(function(data) {
    $scope.termModel = data.data;

    //Set active show
    if($scope.termModel.active != true){
      $scope.isObsolete = true;
    }


    //Set restrictions show
    if($scope.termModel.usage != 'U' && $scope.termModel.goTerm){
      $scope.showRestrictions = true;
    }

  });



   // Set up statistics for co-occurring page
  $scope.statsPromise = termService.getStats(termId);
  $scope.statsPromise.then(function(d){
    $scope.stats = d.data;
    $scope.totalTogetherAllStats = 0,
    $scope.totalComparedAllStats = 0,
    $scope.totalTogetherNonIEAStats = 0,
    $scope.totalComparedNonIEAStats = 0;

    angular.forEach(d.data.allCoOccurrenceStatsTerms, function(val, key){
      $scope.totalTogetherAllStats = $scope.totalTogetherAllStats + val.together;
      $scope.totalComparedAllStats = $scope.totalTogetherAllStats + val.compared;
    });

    angular.forEach(d.data.nonIEACOOccurrenceStatistics, function(val, key){
      $scope.totalTogetherNonIEAStats = $scope.totalTogetherNonIEAStats + val.together;
      $scope.totalComparedNonIEAStats = $scope.totalComparedNonIEAStats + val.compared;
    });

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
