'use strict';
app.controller('taxonFilter', function($scope, $rootScope, $q, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService, filterService){

  $scope.taxa = [];

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxa, 'checked'), 'id');
  };

  var initTaxons = function(){
    $scope.taxa = filterService.getQueryFilterItems($scope.query.taxonId);
    taxonomyService.initTaxa($scope.taxa).then(function (data) {
      $scope.taxa = data;
    });
  };

  $scope.reset = function() {
    $scope.query.taxonId = '';
    initTaxons();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $scope.addToQueryAndUpdate('taxonId', getQuery());
  };

  $scope.addTaxons = function() {
    taxonomyService.addNewTaxa($scope.taxa, $scope.taxonTextArea).then(function(data) {
      $scope.taxa = data;
      $scope.taxonTextArea = '';
    });
  };

  initTaxons();
});
