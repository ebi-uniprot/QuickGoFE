/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($rootScope, $scope, $http, $q, $location, $anchorScroll, basketService,
                                    ENV, filteringService, quickGOHelperService, $document, $routeParams, termService,
                                    PreDefinedSlimSets) {

  $scope.targetDomainAndPort = ENV.apiEndpoint;

  //Clear search term
  $scope.searchText = '';

  $scope.termInformation = true;

  var termId = $routeParams.goId;
  $rootScope.header = "QuickGO::Term "+termId;

  //Setup and easy flag to see if this is a goterm or and ECO code we are looking at.
  if (termId.lastIndexOf('ECO', 0) === 0) {
    $scope.isGoTerm = false;
  } else {
    $scope.isGoTerm = true;
  }

  //Get predefined slim sets
  //$scope.predefinedSlimSets = PreDefinedSlimSets.query();

  /**
   * Get Term Data from WS
   */
  $scope.termPromise = termService.getTerm(termId, $scope.isGoTerm);

    $scope.termPromise.then(function(data) {
        $scope.termModel = data.data.results[0];
        console.log($scope.termModel); //todo

        //set secondary ids string
        $scope.termModel.secondaryIdsString = $scope.termModel.secondaryIds ?
            $scope.termModel.secondaryIds.join() : '';

        //set function filters for history/change log
        $scope.termModel.historyDefSyn = _.filter($scope.termModel.history, function(hist) {
            return hist.category === 'DEFINITION' || hist.category === 'SYNONYM';
        });
        $scope.termModel.historyOther = _.filter($scope.termModel.history, function(hist) {
            return hist.category !== 'TERM' && hist.category !== 'DEFINITION' && hist.category !== 'SYNONYM'
                && hist.category !== 'RELATION' && hist.category !== 'XREF';
        });

        //Set active show
        if($scope.termModel.isObsolete === true){
          $scope.isObsolete = true;
        }

        //Set restrictions show
        if(($scope.termModel.usage === 'Unrestricted') || (!$scope.isGoTerm)) {
          $scope.showRestrictions = false;
        } else {
          $scope.showRestrictions = true;
        }

        //Set GO Slim subset counts
        /*angular.forEach($scope.predefinedSlimSets, function(slim) {
          angular.forEach($scope.termModel.subsets, function(subset) {

            if (subset.name === slim.subset) {
              subset.count = slim.subsetCount;
            }

          });
        });*/

    },function(reason) {
        $scope.notFoundReason = reason;
        angular.element($document[0].querySelector('#containerNotFound')).addClass('show-not-found');
    });

  if($scope.isGoTerm) {
    // Set up statistics for co-occurring page
    /*$scope.statsPromise = termService.getStats(termId);
    $scope.statsPromise.then(function(d){
      $scope.stats = d.data;
      $scope.totalTogetherAllStats = 0;
      $scope.totalComparedAllStats = 0;
      $scope.totalTogetherNonIEAStats = 0;
      $scope.totalComparedNonIEAStats = 0;

      angular.forEach(d.data.allCoOccurrenceStatsTerms, function(val){
        $scope.totalTogetherAllStats = $scope.totalTogetherAllStats + val.together;
        $scope.totalComparedAllStats = $scope.totalTogetherAllStats + val.compared;
      });

      angular.forEach(d.data.nonIEACOOccurrenceStatistics, function(val, key){
        $scope.totalTogetherNonIEAStats = $scope.totalTogetherNonIEAStats + val.together;
        $scope.totalComparedNonIEAStats = $scope.totalComparedNonIEAStats + val.compared;
      });
    });
    */

    // Set up blacklist for selected term
    /*$scope.blacklistPromise = termService.getBlacklist(termId);
    $scope.blacklistPromise.then(function(d){
      console.log("Blacklist returned for term", d);
      $scope.termWithBlacklist = d.data;
    });*/
  }

  /**
   * ---------------------------------------------- Scope methods ----------------------------------------------------
   */


function copyArray(array) {
   return array.map(function(arr) {
     return arr.slice();
   });
}

var originalCoords = [];

angular.element(window).ready(function () {
  //makeMapFitImage();
});

var makeMapFitImage = function(){
        var ImageMap = function () {
                var map = document.getElementById('ontologygraphmap'),
                    img = document.getElementById('ontologyGraphImage'),
                    natWidth = img.naturalWidth,
                    areas = map.getElementsByTagName('area'),
                    len = areas.length,
                    coords = [];

               for (n = 0; n < len; n++) {
                   coords[n] = areas[n].coords.split(',');
               }
               if (originalCoords.length < 1){
                 originalCoords = coords;
               }

               this.resize = function () {
                   var nc, m, clen,
                       x = img.offsetWidth / natWidth;
                      var coordsTemp = new copyArray(originalCoords);

                   for (nc = 0; nc < len; nc++) {
                       clen = coordsTemp[nc].length;
                       for (m = 0; m < clen; m++) {
                           coordsTemp[nc][m] *= x;
                       }
                       areas[nc].coords = coordsTemp[nc].join(',');
                   }
                   return true;
               };
           },
           imageMap = new ImageMap();
           imageMap.resize();
};

window.onresize = function () {
   makeMapFitImage();
};



  /**
  * Deals with making the right nav menu fixed
  */
  $document.on('scroll', function() {
    var container = angular.element($document[0].querySelector('#container'));
    if (container[0]) {
      if (container[0].getBoundingClientRect().top <= 10) {
        angular.element($document[0].querySelector('#term-section-nav')).addClass('fixed');
      } else {
        var nav = angular.element($document[0].querySelector('#term-section-nav'));
        if (nav.hasClass('fixed')) {
          nav.removeClass('fixed');
        }
      }
    }
  });

});
