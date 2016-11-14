app.controller('taxonFilter', function($scope, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService){

  $scope.taxaIds = {};
  $scope.taxaMapping = {};

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
        $scope.taxaIds[taxon.name] = taxon;
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
    return _.pluck(_.filter($scope.taxaIds, 'checked'), 'name');
  };

  var getTaxaInfo = function (taxaIds) {
    if (taxaIds.length !== 0) {
      var taxonomyPromise = taxonomyService.getTaxa(taxaIds);
      taxonomyPromise.then(function (multipleTaxa) {
        angular.forEach(multipleTaxa.data.taxonomies, function (taxon) {
          $scope.taxaMapping[taxon.taxonomyId] = taxon;
        });
      });
    }
  };

  $scope.addTaxons = function() {
    var taxons = stringService.getTextareaItemsAsArray($scope.taxonTextArea);
    angular.forEach(taxons, function(taxonId){
      if($scope.taxaIds[taxonId]) {
        $scope.taxaIds[taxonId].checked = true;
      } else {
        $scope.taxaIds[taxonId] = {
          'name': taxonId,
          'checked': true
        };
        getTaxaInfo([taxonId]);
      }
    });
    $scope.taxonTextArea = '';
  };

  initTaxons();
});
