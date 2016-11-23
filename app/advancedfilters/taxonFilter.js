app.controller('taxonFilter', function($scope, $q, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService){

  $scope.taxa = {};

  var initTaxons = function(){
    presetsService.getPresetsTaxa().then(function(resp){
      var checked = [];
      if($scope.query.taxonId) {
        checked = checked.concat($scope.query.taxonId.split(','))
      }

      var ids = [];
      var predefinedTaxa = resp.data.taxons;
      angular.forEach(predefinedTaxa, function(taxon){
        ids.push(taxon.name);
        taxon.checked = _.contains(checked, taxon.name);
        $scope.taxa[taxon.name] = taxon;
      });
      getTaxaInfo(ids).then(function(data) {
        extendTaxa($scope.taxa, data.taxonomies);
      });
    });
  };

  $scope.reset = function() {
    $scope.query.taxonId = '';
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.addToQuery('taxonId', getQuery());
  };

  $scope.addTaxons = function() {
    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    var tempTaxa = {};
    var validIds = [];
    angular.forEach(taxons, function(taxonId){
      if($scope.taxa[taxonId]) {
        $scope.taxa[taxonId].checked = true;
      } else {
        if (validationService.validateTaxon(taxonId)) {
          validIds.push(taxonId);
          tempTaxa[taxonId] = {
            'name': taxonId,
            'checked': true
          };
        }
      }
    });
    getTaxaInfo(validIds).then(function(data) {
      cleanTaxaInformation(tempTaxa, data);
    });
    $scope.taxonTextArea = '';
  };

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxa, 'checked'), 'name');
  };

  var getTaxaInfo = function (taxaIds) {
    var defer = $q.defer();
    if (taxaIds.length !== 0) {
      var taxonomyPromise = taxonomyService.getTaxa(taxaIds);
      taxonomyPromise.then(function (multipleTaxa) {
        defer.resolve(multipleTaxa.data);
      });
    } else {
      defer.resolve({taxonomies: [], errors: [], redirects: []});
    }
    return defer.promise;
  };

  var extendTaxa = function (taxa, taxaInfo) {
    angular.forEach(taxaInfo, function (taxon) {
      _.extend(taxa[taxon.taxonomyId], taxon);
    });
  };

  var removeTaxa = function(taxaInfo, errors) {
    angular.forEach(errors, function (error) {
      delete taxaInfo[error.requestedId];
    });
  };

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

  var cleanTaxaInformation = function(taxaInfo, data) {
    removeTaxa(taxaInfo, data.errors);
    var redirectIds = redirectTaxa(taxaInfo, data.redirects);
    extendTaxa(taxaInfo, data.taxonomies);
    _.extend($scope.taxa, taxaInfo);
    getTaxaInfo(redirectIds).then(function(redirectedData) {
      extendTaxa($scope.taxa, redirectedData.taxonomies);
    });
  };

  initTaxons();
});