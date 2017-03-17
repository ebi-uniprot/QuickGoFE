'use strict';
app.controller('taxonFilter', function($scope, $rootScope, $q, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService, filterService){

  $scope.taxa = [];
  $scope.taxonUsage = 'descendants';

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxa, 'checked'), 'id');
  };

  var initTaxons = function(){
    $scope.taxa = filterService.getQueryFilterItems($scope.query.taxonId);

    $scope.taxonUsage = $scope.$parent.query.taxonUsage ? $scope.$parent.query.taxonUsage : 'descendants';

    presetsService.getPresetsTaxa().then(function(resp){
      var presetItems = filterService.getPresetFilterItems(resp.data.taxons, 'id');
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
    $scope.addToQuery('taxonUsage', $scope.taxonUsage);
    $scope.addToQueryAndUpdate('taxonId', getQuery());
  };

  $scope.addTaxons = function() {
    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    var items = filterService.addFilterItems(taxons, validationService.validateTaxon);
    $scope.taxa = filterService.mergeRightToLeft(items, $scope.taxa);
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
        // remove from list
        var obsoleteIds = _.pluck(data.data.errors, 'requestedId');
        $rootScope.alerts = _.map(data.data.errors, function(message){
          return {
            msg: message.requestedId + ': ' + message.errorMessage
          };
        });
        $scope.taxa = $scope.removeTaxIds(obsoleteIds, $scope.taxa);
      }
      if(data.data.redirects) {
        // update object in list
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
        $rootScope.alerts.push({msg: d.id + ' was updated to ' + updatedId});
        d.id = updatedId;
      }
      return d;
    });
  };

  initTaxons();
});
