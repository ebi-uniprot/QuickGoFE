'use strict';
app.controller('goTermsFilter', function($scope, basketService, stringService, hardCodedDataService,
  validationService, termService, presetsService, $rootScope, filterService){

  $scope.goTerms = [];
  $scope.totalChecked = 0;
  $scope.goTermUse = 'descendants';
  $scope.goRelations = 'is_a,part_of,occurs_in';
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().goId;

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
    $scope.totalChecked = $scope.getAllChecked($scope.goTerms).length;
    $rootScope.alerts = [];
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
        });
      }
    }
  };

  $scope.reset = function() {
    $scope.$parent.query.goId = '';
    $scope.$parent.query.goUsage = '';
    $scope.$parent.query.goUsageRelationships = '';
    init();
    $scope.$parent.updateQuery();
    $rootScope.alerts = [];
  };

  $scope.addGoTerms = function() {
    var goterms = stringService.getTextareaItemsAsArray($scope.goTermsTextArea.toUpperCase());
    var allTerms = filterService.addFilterItems(goterms,validationService.validateGOTerm);
    $scope.stackErrors(allTerms.dismissedItems, 'alert', 'is not a valid GO term id');
    var response = $scope.updateSelectedTerms($scope.goTerms, allTerms.filteredItems, $scope.uploadLimit);
    if (response) {
      $scope.goTerms = response.selection;
      $scope.totalChecked = response.totalChecked;
      updateTermInfo();
    }
    $scope.goTermsTextArea = '';
  };

  $rootScope.$on('basketUpdate', function() {
    init();
  });

  $scope.apply = function() {
    var selected = _.pluck($scope.getAllChecked($scope.goTerms), 'id');
    $scope.$parent.addToQuery('goId', selected);
    $scope.$parent.addToQuery('goUsage', $scope.goTermUse);
    $scope.$parent.addToQuery('goUsageRelationships', $scope.goRelations);
    $rootScope.alerts = [];
  };

  $scope.addPredefinedSet = function() {
    if($scope.selectedPreDefinedSlimSet) {
      var slimSetItems = $scope.selectedPreDefinedSlimSet.associations;
      if(!$scope.includeRootTerms) {
        slimSetItems = filterService.removeRootTerms(slimSetItems);
      }
      var filterItems = filterService.getPresetFilterItems(slimSetItems, 'id', true);
      var response = $scope.updateSelectedTerms($scope.goTerms, filterItems, $scope.uploadLimit);
      if (response) {
        $scope.goTerms = response.selection;
        $scope.totalChecked = response.totalChecked;
      }
      $scope.selectedPreDefinedSlimSet = '';
    }
  };

  $scope.updateSelection = function(term){
    $scope.totalChecked = $scope.$parent.updateSelection($scope.goTerms, term, $scope.uploadLimit);
  };

  init();
});
