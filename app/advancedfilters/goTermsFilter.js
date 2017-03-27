'use strict';
app.controller('goTermsFilter', function($scope, basketService, stringService, hardCodedDataService,
  validationService, termService, presetsService, $rootScope, filterService, limitChecker){

  $scope.goTerms = [];
  $scope.goTermUse = 'descendants';
  $scope.goRelations = 'is_a,part_of,occurs_in';
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().goId;

  var removeTerm = function(termId) {
    $scope.goTerms = _.filter($scope.goTerms, function(d){
        return d.id !== termId;
    });
  };

  var updateTermInfo = function() {
    if($scope.goTerms.length > 0){
      var termsToGet = _.filter($scope.goTerms, function(term){
        return term.item === undefined;
      });
      if (termsToGet.length !== 0) {
        termService.getGOTerms(_.pluck(termsToGet,'id')).then(function(d){
          var data = d.data.results;
          filterService.enrichFilterItemObject($scope.goTerms, data, 'id');
          angular.forEach($scope.goTerms, function(term) {
              if(term.item.isObsolete) {
                removeTerm(term.id);
                $rootScope.alerts.push({
                  type: 'alert',
                  msg:term.id + ' is obsolete'
                });
              }
          });
        });
      }
    }
  };

  var init = function() {
    $rootScope.cleanErrorMessages();
    //Get terms from url
    $scope.goTerms = filterService.getQueryFilterItems($scope.query.goId);
    $scope.includeRootTerms = false;

    $scope.goTermUse = $scope.$parent.query.goUsage ? $scope.$parent.query.goUsage : 'descendants';
    $scope.goRelations = $scope.$parent.query.goUsageRelationships ? $scope.$parent.query.goUsageRelationships : 'is_a,part_of,occurs_in';

    if (basketService.getIds().length > 0){
      $scope.goTerms = filterService.mergeArrays($scope.goTerms,
        filterService.getFilterItemsForIds(basketService.getIds()));
    }

    presetsService.getPresetsGOSlimSets().then(function(resp){
      $scope.predefinedSlimSets = resp.data.goSlimSets;
    });

    updateTermInfo();
  };

  $scope.reset = function() {
    $rootScope.cleanErrorMessages();
    $scope.$parent.query.goId = '';
    $scope.$parent.query.goUsage = '';
    $scope.$parent.query.goUsageRelationships = '';
    init();
    $scope.$parent.updateQuery();
  };

  $scope.addGoTerms = function() {
    $rootScope.cleanErrorMessages();
    var goterms = stringService.getTextareaItemsAsArray($scope.goTermsTextArea.toUpperCase());
    var validatedTerms = filterService.validateItems(goterms,validationService.validateGOTerm);
    $rootScope.stackErrors(validatedTerms.invalidItems, 'alert', 'is not a valid GO term id');
    $scope.goTerms = limitChecker.getMergedItems($scope.goTerms, validatedTerms.validItems, $scope.uploadLimit);
    updateTermInfo();
    $scope.goTermsTextArea = '';
  };

  $rootScope.$on('basketUpdate', function() {
    init();
  });

  $scope.getTotalChecked = function() {
    return limitChecker.getAllChecked($scope.goTerms).length;
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    var selected = _.pluck(limitChecker.getAllChecked($scope.goTerms), 'id');
    $scope.$parent.addToQuery('goId', selected);
    if ($scope.goTermUse !== 'exact') {
      $scope.$parent.addToQuery('goUsageRelationships', $scope.goRelations);
    }
    $scope.$parent.addToQueryAndUpdate('goUsage', $scope.goTermUse);
  };

  $scope.addPredefinedSet = function() {
    $rootScope.cleanErrorMessages();
    if($scope.selectedPreDefinedSlimSet) {
      var slimSetItems = $scope.selectedPreDefinedSlimSet.associations;
      if(!$scope.includeRootTerms) {
        slimSetItems = filterService.removeRootTerms(slimSetItems);
      }
      var filterItems = filterService.getPresetFilterItems(slimSetItems, 'id', true);
      $scope.goTerms = limitChecker.getMergedItems($scope.goTerms, filterItems, $scope.uploadLimit);
      updateTermInfo();
      $scope.selectedPreDefinedSlimSet = '';
    }
  };

  $scope.selectTerm = function(term) {
    $rootScope.cleanErrorMessages();
    if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.goTerms), $scope.uploadLimit)) {
      _.find($scope.goTerms, term).checked = false;
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
    }
  };

  init();
});
