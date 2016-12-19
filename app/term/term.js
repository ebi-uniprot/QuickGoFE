/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($rootScope, $scope, $http, $q, $location, $anchorScroll, basketService,
                                    ENV, quickGOHelperService, $document, $routeParams, termService,
                                    ontoTypeService, presetsService, filterFilter) {

  $scope.targetDomainAndPort = ENV.apiEndpoint;
  $scope.filter = filterFilter;

  // set default row count for tables
  $scope.defaultPageSize = 10;
  $scope.statsLimit = 100;
  $scope.blacklistPageSize = $scope.defaultPageSize;
  $scope.childTermsPageSize = $scope.defaultPageSize;
  $scope.taxonConstraintsPageSize = $scope.defaultPageSize;
  $scope.proteinComplexesPageSize = $scope.defaultPageSize;
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
  $scope.slimSetMapping = {};

  $scope.termId = $routeParams.goId;
  $rootScope.header = "QuickGO::Term "+$scope.termId;
  $rootScope.fullWidthPage = false;

  //Setup and easy flag to see if this is a goterm or and ECO code we are looking at.
  if ($scope.termId.lastIndexOf('ECO', 0) === 0) {
    $scope.isGoTerm = false;
    $scope.termPromise = termService.getECOCompleteTerms($scope.termId);
  } else {
    $scope.isGoTerm = true;
    $scope.termPromise = termService.getGOCompleteTerms($scope.termId);
  }

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
          getSlimSet();
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

    },function(reason) {
        $scope.notFoundReason = reason;
        angular.element($document[0].querySelector('#containerNotFound')).addClass('show-not-found');
    });

  /**
   * ---------------------------------------------- Scope methods ----------------------------------------------------
   */

    var getSlimSet = function() {
        presetsService.getPresetsGOSlimSets().then(function(resp) {
            angular.forEach(resp.data.goSlimSets, function(slimSet) {
                if (_.contains($scope.termModel.subsets, slimSet.name)) {
                    $scope.slimSetMapping[slimSet.name] = slimSet;
                }
            });
        });
    };

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

               for (var n = 0; n < len; n++) {
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
