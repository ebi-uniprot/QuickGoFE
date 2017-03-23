'use strict';
app.controller('taxonFilter', function($scope, $rootScope, $q, hardCodedDataService,
  stringService, validationService, presetsService, taxonomyService, filterService, limitChecker){

  $scope.taxa = [];
  $scope.totalChecked = 0;
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().taxonId;

  var getQuery = function() {
    return _.pluck(_.filter($scope.taxa, 'checked'), 'id');
  };

  var initTaxons = function(){
    $rootScope.cleanErrorMessages();

    $scope.taxa = filterService.getQueryFilterItems($scope.query.taxonId);
    $scope.taxonUsage = ($scope.query.taxonUsage) ? $scope.query.taxonUsage: 'descendants';

    taxonomyService.initTaxa($scope.taxa).then(function (data) {
      $scope.taxa = data.taxa;
      $scope.totalChecked = data.totalChecked;
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
    $scope.addToQueryAndUpdate('taxonUsage', $scope.taxonUsage);
  };

  $scope.addTaxons = function() {
    $rootScope.cleanErrorMessages();

    taxonomyService.addNewTaxa($scope.taxa, $scope.taxonTextArea, $scope.totalChecked, $scope.uploadLimit)
      .then(function(data) {
        $scope.taxa = data.taxa;
        $scope.totalChecked = data.totalChecked;
        $scope.taxonTextArea = '';
    });
  };

  $scope.updateTotalCheckedOnChange = function(term) {
    $rootScope.cleanErrorMessages();
    var currentTotalCheck = limitChecker.getAllChecked($scope.taxa).length;
    $scope.totalChecked = limitChecker.getTotalCheckedAfterHandlingLimitError(
      limitChecker.getAllChecked($scope.taxa).length, limitChecker.getAllChecked($scope.taxa).length,
      $scope.uploadLimit);
    term.checked = limitChecker.isTotalDifferent(currentTotalCheck, $scope.totalChecked) ? !term.checked : term.checked;
  };

  initTaxons();
});
