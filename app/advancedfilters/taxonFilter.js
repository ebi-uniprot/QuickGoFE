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

  $scope.updateTotalCheckedOnChange = function() {
    $rootScope.cleanErrorMessages();
  };

  initTaxons();
});
