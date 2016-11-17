app.controller('taxonFilter', function($scope, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService){

  $scope.taxa = {};

  var initTaxons = function(){
    presetsService.getPresetsTaxa().then(function(resp){
      var checked = [];
      if($scope.$parent.query.taxonId) {
        checked = checked.concat($scope.$parent.query.taxonId.split(','))
      }

      var ids = [];
      var predefinedTaxa = resp.data.taxons;
      angular.forEach(predefinedTaxa, function(taxon){
        ids.push(taxon.name);
        taxon.checked = _.contains(checked, taxon.name);
        $scope.taxa[taxon.name] = taxon;
      });
      getTaxaInfo(ids);
    });
  };

  $scope.reset = function() {
    $scope.query.taxonId = '';
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.$parent.addToQuery('taxonId', getQuery());
  };

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxa, 'checked'), 'name');
  };

  var getTaxaInfo = function (taxaIds, withRedirection) {
    if (taxaIds.length !== 0) {
      var taxonomyPromise = taxonomyService.getTaxa(taxaIds);
      taxonomyPromise.then(function (multipleTaxa) {
        angular.forEach(multipleTaxa.data.taxonomies, function (taxon) {
          _.extend($scope.taxa[taxon.taxonomyId], taxon);
        });
        angular.forEach(multipleTaxa.data.errors, function (error) {
          delete $scope.taxa[error.requestedId];
        });
        if (withRedirection === true) {
          var redirectedIds = [];
          angular.forEach(multipleTaxa.data.redirects, function (redirection) {
            var taxonId = redirection.redirectLocation.substring(redirection.redirectLocation.lastIndexOf('/')+1);
            redirectedIds.push(taxonId);
            $scope.taxa[taxonId] = {
              'name': taxonId,
              'checked': true
            };
            delete $scope.taxa[redirection.requestedId];
          });
          getTaxaInfo(redirectedIds, false);
        }
      });
    }
  };

  $scope.addTaxons = function() {
    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    var validIds = [];
    angular.forEach(taxons, function(taxonId){
      if($scope.taxa[taxonId]) {
        $scope.taxa[taxonId].checked = true;
      } else {
        if (validationService.validateTaxon(taxonId)) {
          validIds.push(taxonId);
          $scope.taxa[taxonId] = {
            'name': taxonId,
            'checked': true
          };
        }
      }
    });
    getTaxaInfo(validIds, true);
    $scope.taxonTextArea = '';
  };

  initTaxons();
});