'use strict';
app.controller('geneProductFilter', function(
  $scope,
  stringService,
  validationService,
  presetsService,
  filterService,
  hardCodedDataService,
  $rootScope,
  limitChecker
) {
  $scope.gpIds = [];
  $scope.geneProductSets = [];
  $scope.gpTypes = [];
  $scope.gpTypesSubSets = [];
  $scope.gpTypesProteomes = [];
  $scope.geneProductSubset = [];
  $scope.uploadLimit = hardCodedDataService.getServiceLimits().geneProductId;

  var initgpIds = function() {
    $scope.gpIds = filterService.getQueryFilterItems($scope.query.geneProductId);
    presetsService.getPresetsGeneProducts().then(function(resp) {
      var queryFilterItems = filterService.getQueryFilterItems($scope.query.targetSet);
      var presetFilterItems = filterService.getPresetFilterItems(
        _.sortBy(resp.data.geneProducts, 'name'),
        'name'
      );
      $scope.geneProductSets = filterService.mergeArrays(queryFilterItems, presetFilterItems);
    });
  };

  var initgpTypes = function() {
    $scope.gpTypes = [
      {"id":"miRNA","item":{"associations":null,"name":"RNA","id":"miRNA"},"checked":false},
      {"id":"complex","item":{"associations":null,"name":"Complexes","id":"complex"},"checked":false}
      //"protein" is not in this list as its hard coded separately to handle the sub sections below
    ];
    $scope.gpTypesSubSets = [
      {"id":"Swiss-Prot","item":{"associations":null,"name":"Reviewed (Swiss-Prot)","id":"Swiss-Prot"},"checked":true},
      {"id":"TrEMBL","item":{"associations":null,"name":"Unreviewed (TrEMBL)","id":"TrEMBL"},"checked":true}
    ];
    $scope.gpTypesProteomes = [
      {"id":"gcrpCan","item":{"associations":null,"name":"Reference Proteomes (Gene centric, canonical)","id":"gcrpCan"},"checked":true},
      {"id":"gcrpIso","item":{"associations":null,"name":"Reference Proteomes (Gene centric, other isoforms)","id":"gcrpIso"},"checked":true},
      {"id":"complete","item":{"associations":null,"name":"Complete Proteomes","id":"complete"},"checked":true},
      {"id":"none","item":{"associations":null,"name":"None","id":"none"},"checked":true}
    ];

    // Looks to put a tick in the box of anything being filtered
    presetsService.getPresetsGeneProductTypes().then(function(resp) {

      var queryFilterItems = filterService.getQueryFilterItems($scope.query.geneProductType);
      var presetFilterItems = filterService.getPresetFilterItems(resp.data.geneProductTypes, 'id');
      var queryGeneProductSubset = filterService.getQueryFilterItems($scope.query.geneProductSubset);
      var queryProteome = filterService.getQueryFilterItems($scope.query.proteome);

      if (queryFilterItems.length > 0){
          var inTheURL = _.pluck(queryFilterItems, 'id');
          // Loop through and apply ticks to items in the filter
          _.each(inTheURL, function(id) {
              var match = _.find($scope.gpTypes, function(item) { return item.id === id })
              if (match) {
                  match.checked = true;
              }
          });
          // if protein is active, then open up the Proteins tickbox expansion
          if (_.contains(inTheURL, "protein")){
              $scope.gpTypesSubSetsList = true;
          }
      };

      var unTickProteins = function(arrayToEffect, items) {
          if (items.length > 0){
              var inTheURL = _.pluck(items, 'id');
              var inTheArray = _.pluck(arrayToEffect, 'id');
              var itemsToUncheck = _.difference(inTheArray, inTheURL );
              _.each(itemsToUncheck, function(id) {
                  var match = _.find(arrayToEffect, function(item) { return item.id === id })
                  if (match) {
                      match.checked = false;
                  }
              });
          };
      };
      unTickProteins($scope.gpTypesProteomes, queryProteome);
      unTickProteins($scope.gpTypesSubSets, queryGeneProductSubset);
    });
  };



  var init = function() {
    initgpIds();
    initgpTypes();
  };

  $scope.reset = function() {
    $scope.query.geneProductId = '';
    $scope.query.targetSet = '';
    $scope.query.geneProductType = '';
    init();
    $scope.updateQuery();
  };

  $scope.apply = function() {
    if ($scope.gpIds.length > 0) {
      $scope.addToQuery('geneProductId', _.pluck(_.filter($scope.gpIds, 'checked'), 'id'));
    }
    if ($scope.geneProductSets.length > 0) {
      $scope.addToQuery('targetSet', _.pluck(_.filter($scope.geneProductSets, 'checked'), 'id'));
    }
    if ($scope.gpTypes.length > 0) {
      $scope.addToQuery('geneProductType', _.pluck(_.filter($scope.gpTypes, 'checked'), 'id'));
    }

    $scope.checkedGPTypesSubSetsList = _.pluck(_.filter($scope.gpTypesSubSets, 'checked'), 'id');
    if ($scope.checkedGPTypesSubSetsList.length < 2) {
      $scope.addToQuery('geneProductSubset', _.pluck(_.filter($scope.gpTypesSubSets, 'checked'), 'id'));
    }

    $scope.checkedProteomesList = _.pluck(_.filter($scope.gpTypesProteomes, 'checked'), 'id');
    if ($scope.checkedProteomesList.length < 4) {
      $scope.addToQuery('proteome', _.pluck(_.filter($scope.gpTypesProteomes, 'checked'), 'id'));
    }

    //if proteins is open $scope.gpTypesSubSetsList = true;   then add proteins to the geneProductType
    if ($scope.gpTypesSubSetsList == true) {
      $scope.gpTypesChecked = _.pluck(_.filter($scope.gpTypes, 'checked'), 'id');
      $scope.mergedArrays = _.union($scope.gpTypesChecked, ['protein'])
      $scope.addToQuery('geneProductType', $scope.mergedArrays);
    }

    $scope.updateQuery();
  };

  $scope.addGPs = function() {
    var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea.toUpperCase());
    var validatedItems = filterService.validateItems(
      gps,
      validationService.validateGeneProduct,
      true
    );
    $rootScope.stackErrors(validatedItems.invalidItems, 'alert', 'is not a valid gene product id');
    $scope.gpIds = limitChecker.getMergedItems(
      $scope.gpIds,
      validatedItems.validItems,
      $scope.uploadLimit
    );
    $scope.gpTextArea = '';
  };

  $scope.$watch(
    'gpIds',
    function() {
      if (limitChecker.isOverLimit(limitChecker.getAllChecked($scope.gpIds), $scope.uploadLimit)) {
        $rootScope.alerts.push(hardCodedDataService.getTermsLimitMsg($scope.uploadLimit));
      }
    },
    true
  );

  $scope.getTotalChecked = function() {
    return (
      limitChecker.getAllChecked($scope.gpIds).length +
      limitChecker.getAllChecked($scope.geneProductSets).length +
      _.filter($scope.gpTypes, 'checked').length +
      _.filter($scope.gpTypesSubSets, 'checked').length
    );
  };

  $scope.getCheckedIds = function() {
    return limitChecker.getAllChecked($scope.gpIds).length;
  };

  $scope.getCheckedSets = function() {
    return limitChecker.getAllChecked($scope.geneProductSets).length;
  };

  init();
});
