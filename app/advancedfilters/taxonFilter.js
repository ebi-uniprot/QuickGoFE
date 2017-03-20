'use strict';
app.controller('taxonFilter', function($scope, $rootScope, $q, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService, filterService){

  $scope.taxa = [];
  $scope.totalChecked = 1; //TODO refactor when GOA-2692 is done

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxa, 'checked'), 'id');
  };

  var initTaxons = function(){
    $rootScope.cleanErrorMessages();

    $scope.taxa = filterService.getQueryFilterItems($scope.query.taxonId);
    taxonomyService.initTaxa($scope.taxa).then(function (data) {
      $scope.taxa = data;
    });
  };

  $scope.reset = function() {
    $rootScope.cleanErrorMessages();

    $scope.query.taxonId = '';
    initTaxons();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.addToQueryAndUpdate('taxonId', getQuery());
  };

  $scope.addTaxons = function() {
    $rootScope.cleanErrorMessages();

    taxonomyService.addNewTaxa($scope.taxa, $scope.taxonTextArea).then(function(data) {
      $scope.taxa = data;
      $scope.taxonTextArea = '';
    });
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
    taxonomyService.addNewTaxa($scope.taxa, $scope.taxonTextArea).then(function(data) {
      $scope.taxa = data;
      $scope.taxonTextArea = '';
    });
  };

  $scope.updateTotalCheckedOnChange = function() {
    $rootScope.cleanErrorMessages();
  };

  initTaxons();
});
