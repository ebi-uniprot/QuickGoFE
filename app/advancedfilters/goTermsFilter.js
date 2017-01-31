'use strict';
app.controller('goTermsFilter', function($scope, basketService, stringService,
  validationService, termService, presetsService, $rootScope, filterService){

  $scope.goTerms = [];
  $scope.goTermUse = 'descendants';
  $scope.goRelations = 'is_a,part_of,occurs_in';
  $scope.uploadLimit = 600;


  var init = function() {
    //Get terms from url
    $scope.goTerms = filterService.getQueryFilterItems($scope.query.goId);
    $scope.includeRootTerms = false;

    $scope.goTermUse = $scope.$parent.query.goUsage ? $scope.$parent.query.goUsage : 'descendants';
    $scope.goRelations = $scope.$parent.query.goUsageRelationships ? $scope.$parent.query.goUsageRelationships : 'is_a,part_of,occurs_in';

    if (basketService.getIds().length > 0){
      $scope.goTerms = filterService.mergeRightToLeft($scope.goTerms,
        filterService.getFilterItemsForIds(basketService.getIds()));
    }

     presetsService.getPresetsGOSlimSets().then(function(resp){
       $scope.predefinedSlimSets = resp.data.goSlimSets;
     });

     updateTermInfo();
  };

  var updateTermInfo = function() {
    if($scope.goTerms.length > 0 && $scope.goTerms.length < $scope.uploadLimit){
      var termsToGet = _.filter($scope.goTerms, function(d){
        return d.term === undefined;
      });
      termService.getGOTerms(_.pluck(termsToGet,'id')).then(function(d){
        var data = d.data.results;
        filterService.enrichFilterItemObject($scope.goTerms, data, 'id');
      });
    }
  };

  $scope.reset = function() {
    $scope.$parent.query.goId = '';
    $scope.$parent.query.goUsage = '';
    $scope.$parent.query.goUsageRelationships = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.addGoTerms = function() {
    var goterms = stringService.getTextareaItemsAsArray($scope.goTermsTextArea);
    if(goterms.length > $scope.uploadLimit) {
      $rootScope.alerts.push({
        'msg': 'Sorry, we can only handle uploads of less than ' + $scope.uploadLimit + 'terms.'
      });
    } else {
      var terms = filterService.addFilterItems(goterms,validationService.validateGOTerm);
      $scope.goTerms = filterService.mergeRightToLeft(terms,$scope.goTerms);
      updateTermInfo();
    }
    $scope.goTermsTextArea = '';
  };

  $rootScope.$on('basketUpdate', function() {
    init();
  });

  $scope.apply = function() {
    var selected = _.pluck(_.filter($scope.goTerms, function(term){
      return term.checked;
    }), 'id');
    $scope.$parent.addToQuery('goId', selected);
    $scope.$parent.addToQuery('goUsage', $scope.goTermUse);
    $scope.$parent.addToQuery('goUsageRelationships', $scope.goRelations);
  };

  $scope.addPredefinedSet = function() {
    if($scope.selectedPreDefinedSlimSet) {
      var slimSetItems = $scope.selectedPreDefinedSlimSet.associations;
      if(!$scope.includeRootTerms) {
        slimSetItems = filterService.removeRootTerms(slimSetItems);
      }
      var filterItems = filterService.getPresetFilterItems(slimSetItems, 'id', true);
      $scope.goTerms = filterService.mergeRightToLeft($scope.goTerms, filterItems);
      $scope.selectedPreDefinedSlimSet = '';
    }
  };

  $scope.selectedTermSize = function() {
    return Object.keys($scope.goTerms).length;
  };

  init();
});
