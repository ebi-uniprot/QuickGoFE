'use strict';
app.controller('taxonFilter', function($scope, $rootScope, $q, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService, filterService){

  $scope.taxa = [];
  $scope.alerts = [];

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxa, 'checked'), 'id');
  };

  var processErrors = function() {
    $rootScope.alerts = [];
    $rootScope.alerts = $scope.alerts;
    $scope.alerts = [];
  };

  var initTaxons = function(){
    $scope.taxa = filterService.getQueryFilterItems($scope.query.taxonId);
    presetsService.getPresetsTaxa().then(function(resp){
      var presetItems = filterService.getPresetFilterItems(resp.data.taxons, 'name');
      $scope.taxa = filterService.mergeRightToLeft($scope.taxa, presetItems);
      updateTaxonInfo();
      $scope.alerts = [];
      $rootScope.alerts = [];
    });
  };

  $scope.reset = function() {
    $scope.query.taxonId = '';
    initTaxons();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.addToQuery('taxonId', getQuery());
    $scope.alerts = [];
    $rootScope.alerts = [];
  };

  $scope.addTaxons = function() {
    $scope.alerts = [];

    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    $scope.alerts = $scope.alerts.concat(_.map(
      _.filter(taxons, function(id) {return !validationService.validateTaxon(id);}),
      function(id){
        return {
          type: 'alert',
          msg: '"' + id + '" is not a valid taxon id'
        };
      })
    );
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
          $scope.alerts = $scope.alerts.concat(_.map(
          data.data.errors,
          function(message){
            return {
              type: 'warning',
              msg: 'Id ' + message.requestedId + ': ' + message.errorMessage
            };
          })
        );
        $scope.taxa = $scope.removeTaxIds(obsoleteIds, $scope.taxa);
      }
      if(data.data.redirects) {
        // update object in list
        $scope.taxa = redirectTaxa($scope.taxa, data.data.redirects);
        updateTaxonInfo();
      }
      processErrors();
    });
  };

  var redirectTaxa = function(taxaInfo, redirections) {
    var redirectionMap = _.indexBy(redirections, 'requestedId');
    return _.map(taxaInfo, function(d){
      if(redirectionMap[d.id]) {
        var updatedId = redirectionMap[d.id].redirectLocation.substring(redirectionMap[d.id].redirectLocation.lastIndexOf('/')+1);
        $scope.alerts.push({
          type: 'warning',
          msg: 'Taxon ' + d.id + ' was updated to ' + updatedId
        });
        d.id = updatedId;
      }
      return d;
    });
  };

  $scope.updateChecked = function() {
    $scope.alerts = [];
    $rootScope.alerts = [];
  };

  initTaxons();
});
