'use strict';
app.controller('taxonFilter', function($scope, $rootScope, $q, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService, filterService){

  $scope.taxa = [];

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxa, 'checked'), 'id');
  };

  var initTaxons = function(){
    $scope.taxa = filterService.getQueryFilterItems($scope.query.taxonId);
    presetsService.getPresetsTaxa().then(function(resp){
      var presetItems = filterService.getPresetFilterItems(resp.data.taxons, 'name');
      $scope.taxa = filterService.mergeRightToLeft($scope.taxa, presetItems);
      updateTaxonInfo();
      $rootScope.cleanErrorMessages();
    });
  };

  $scope.reset = function() {
    $scope.query.taxonId = '';
    initTaxons();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.addToQuery('taxonId', getQuery());
    $rootScope.cleanErrorMessages();
  };

  $scope.addTaxons = function() {
    $rootScope.cleanErrorMessages();

    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    var allItems = filterService.addFilterItems(taxons, validationService.validateTaxon);
    $scope.stackErrors(allItems.dismissedItems, 'alert', 'is not a valid taxon id');
    $scope.taxa = filterService.mergeRightToLeft(allItems.filteredItems, $scope.taxa);
    updateTaxonInfo();
    $scope.taxonTextArea = '';
  };

  $scope.removeTaxIds = function(idsToRemove, taxa) {
    return _.filter(taxa, function(d){
      return !_.contains(idsToRemove, parseInt(d.id));
    });
  };

  var updateTaxonInfo = function() {
    taxonomyService.getTaxa(_.pluck($scope.taxa,'id')).then(function(data){
      filterService.enrichFilterItemObject($scope.taxa, data.data.taxonomies, 'taxonomyId');
      if(data.data.errors) {
        var obsoleteIds = _.pluck(data.data.errors, 'requestedId');
        $scope.stackErrors(data.data.errors, 'warning', 'was not found', 'requestedId');
        $scope.taxa = $scope.removeTaxIds(obsoleteIds, $scope.taxa);
      }
      if(data.data.redirects) {
        $scope.taxa = redirectTaxa($scope.taxa, data.data.redirects);
        updateTaxonInfo();
      }
    });
  };

  var redirectTaxa = function(taxaInfo, redirections) {
    var redirectionMap = _.indexBy(redirections, 'requestedId');
    return _.map(taxaInfo, function(d){
      if(redirectionMap[d.id]) {
        var updatedId = redirectionMap[d.id].redirectLocation.substring(redirectionMap[d.id].redirectLocation.lastIndexOf('/')+1);
        $rootScope.alerts.push({
          type: 'warning',
          msg: 'Taxon ' + d.id + ' was updated to ' + updatedId
        });
        d.id = updatedId;
      }
      return d;
    });
  };

  $scope.updateCheckStatus = function() {
    $rootScope.cleanErrorMessages();
  };

  initTaxons();
});
