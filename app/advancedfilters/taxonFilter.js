'use strict';
app.controller('taxonFilter', function($scope, $rootScope, $q, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService, filterService, limitChecker){

  $scope.taxa = [];
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().taxonId;

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxa, 'checked'), 'id');
  };

  var initTaxons = function(){
    $rootScope.cleanErrorMessages();
    $scope.taxonUsage = ($scope.query.taxonUsage) ? $scope.query.taxonUsage: 'descendants';
    taxonomyService.initTaxa($scope.taxa).then(function (data) {
      $scope.taxa = filterService.mergeArrays(data.taxa, filterService.getQueryFilterItems($scope.query.taxonId));
    });
  };

  $scope.reset = function() {
    $rootScope.cleanErrorMessages();
    $scope.query.taxonId = '';
    $scope.query.taxonUsage = '';
    initTaxons();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    $rootScope.cleanErrorMessages();
    $scope.addToQueryAndUpdate('taxonId', getQuery());
    $scope.addToQueryAndUpdate('taxonUsage', $scope.taxonUsage);
  };

  $scope.addTaxons = function() {
    $rootScope.cleanErrorMessages();
    taxonomyService.addNewTaxa($scope.taxa, $scope.taxonTextArea, $scope.uploadLimit).then(function(data) {
      $scope.taxa = data.taxa;
      $scope.taxonTextArea = '';
    });
  };

  $scope.selectTaxon = function(term) {
    $rootScope.cleanErrorMessages();
    if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.taxa), $scope.uploadLimit)) {
      _.find($scope.taxa, term).checked = false;
      $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
    }
  };

  $scope.getTotalChecked = function() {
    return limitChecker.getAllChecked($scope.taxa).length;
  };

  initTaxons();
});
