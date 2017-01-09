'use strict';
app.controller('taxonFilter', function($scope, $q, hardCodedDataService,
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
    });
  };

  $scope.reset = function() {
    $scope.query.taxonId = '';
    initTaxons();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.addToQuery('taxonId', getQuery());
  };

  $scope.addTaxons = function() {
    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    var items = filterService.addFilterItems(taxons, validationService.validateTaxon);
    $scope.taxa = filterService.mergeRightToLeft(items, $scope.taxa);
    updateTaxonInfo();
    $scope.taxonTextArea = '';
  };

  var updateTaxonInfo = function() {
    taxonomyService.getTaxa(_.pluck($scope.taxa,'id')).then(function(data){
      filterService.enrichFilterItemObject($scope.taxa, data.data.taxonomies, 'taxonomyId');
      if(data.data.errors) {
        //TODO remove from list?
      }
      if(data.data.redirects) {
        //TODO update object in list?
      }
    });
  }


  var redirectTaxa = function(taxaInfo, redirections) {
    var redirectedIds = [];
    angular.forEach(redirections, function (redirection) {
      var taxonId = redirection.redirectLocation.substring(redirection.redirectLocation.lastIndexOf('/')+1);
      redirectedIds.push(taxonId);
      taxaInfo[taxonId] = {
        'name': taxonId,
        'checked': true
      };
      delete taxaInfo[redirection.requestedId];
    });
    return redirectedIds;
  };

  initTaxons();
});
