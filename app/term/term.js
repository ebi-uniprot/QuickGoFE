/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($rootScope, $scope, $http, $q, $location, $anchorScroll, basketService,
                                    ENV, quickGOHelperService, $document, $routeParams, termService,
                                    ontoTypeService, PreDefinedSlimSets) {

  $scope.targetDomainAndPort = ENV.apiEndpoint;

  // set default row count for tables
  $scope.defaultPageSize = 10;
  $scope.statsLimit = 100;
  $scope.blacklistPageSize = $scope.defaultPageSize;
  $scope.childTermsPageSize = $scope.defaultPageSize;
  $scope.taxonConstraintsPageSize = $scope.defaultPageSize;
  $scope.crossrefsPageSize = $scope.defaultPageSize;
  $scope.crossOntologyPageSize = $scope.defaultPageSize;
  $scope.replacesPageSize = $scope.defaultPageSize;
  $scope.coOccurringEntirePageSize = $scope.defaultPageSize;
  $scope.coOccurringManualPageSize = $scope.defaultPageSize;
  $scope.changeLogPageSize = $scope.defaultPageSize;
  $scope.synonymPageSize = $scope.defaultPageSize;

  //Clear search term
  $scope.searchText = '';

  $scope.termInformation = true;

  $scope.goTermMapping = {};

  var termId = $routeParams.goId;
  $rootScope.header = "QuickGO::Term "+termId;

  //Setup and easy flag to see if this is a goterm or and ECO code we are looking at.
  if (termId.lastIndexOf('ECO', 0) === 0) {
    $scope.isGoTerm = false;
    $scope.termPromise = termService.getECOCompleteTerms(termId);
  } else {
    $scope.isGoTerm = true;
    $scope.termPromise = termService.getGOCompleteTerms(termId);
  }

  //Get predefined slim sets
  //$scope.predefinedSlimSets = PreDefinedSlimSets.query();

  /**
   * Get Term Data from WS
   */
    $scope.termPromise.then(function(data) {
        $scope.termModel = data.data.results[0];

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

        $scope.readableAspect = ontoTypeService.ontoReadableText($scope.termModel.aspect);

        //Set restrictions show
        if(($scope.termModel.usage === 'Unrestricted') || (!$scope.isGoTerm)) {
          $scope.showRestrictions = false;
        } else {
          $scope.showRestrictions = true;
        }


        var ids = _.pluck(_.union($scope.termModel.replaces, $scope.termModel.replacements, $scope.termModel.children), 'id');

        if($scope.isGoTerm) {
          $scope.additionalTermsPromise = termService.getGOTerms(ids);
        } else {
          $scope.additionalTermsPromise = termService.getECOTerms(ids);
        }

        $scope.additionalTermsPromise
            .then(function(moreData) {
                addInformation($scope.termModel.replaces, moreData.data.results);
                addInformation($scope.termModel.replacements, moreData.data.results);
                addInformation($scope.termModel.children, moreData.data.results);
            }, function (reason) {
                $scope.notFoundAdditionaTermsReason = reason;
                console.log(reason);
            }
        );

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

    var getAdditionalGOTerms = function() {
        termService.getGOTerms(_.keys($scope.goTermMapping)).then(function (resp) {
            angular.forEach(resp.data.results, function (goTerm) {
                $scope.goTermMapping[goTerm.id] = goTerm;
            });
        });
    };

    var getAllStats = function(maxDisplay) {
        $scope.totalTogetherAllStats = 0;
        $scope.totalComparedAllStats = 0;

        var statsPromise = termService.getAllStats(termId, maxDisplay);
        statsPromise.then(function(d) {
            $scope.allStats = d.data;

            angular.forEach(d.data.results, function(val){
                $scope.goTermMapping[val.comparedTerm] = $scope.goTermMapping[val.comparedTerm] || {};
                $scope.totalTogetherAllStats += +val.together;
                $scope.totalComparedAllStats += +val.compared;
            });
            getAdditionalGOTerms();
        });
    };

    var getManualStats = function(maxDisplay) {
        $scope.totalTogetherManualStats = 0;
        $scope.totalComparedManualStats = 0;

        var statsPromise = termService.getManualStats(termId, maxDisplay);
        statsPromise.then(function(d) {
            $scope.manualStats = d.data;
            angular.forEach(d.data.results, function(val){
                $scope.goTermMapping[val.comparedTerm] = $scope.goTermMapping[val.comparedTerm] || {};
                $scope.totalTogetherManualStats += +val.together;
                $scope.totalComparedManualStats += +val.compared;
            });
            getAdditionalGOTerms();
        });
    };

    if($scope.isGoTerm) {
      getAllStats($scope.statsLimit);
      getManualStats($scope.statsLimit);

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

    var addInformation = function(lst, moreDataLst) {
        angular.forEach(lst, function(term) {
          var inResult = _.find(moreDataLst, function(datum) {
              return datum.id === term.id;
          });
          if (inResult) {
              term.name = inResult.name;
              term.aspect = ontoTypeService.ontoReadableText(inResult.aspect);
          }
        });
    };

    var copyArray = function(array) {
        return array.map(function(arr) {
            return arr.slice();
        });
    };

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
