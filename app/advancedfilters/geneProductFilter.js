'use strict';
app.controller('geneProductFilter', function ($scope, stringService,
  validationService, presetsService) {

  $scope.gpIds = [];
  $scope.geneProductSets = {};

  var initgpIds = function () {
    presetsService.getPresetsGeneProducts().then(function(resp){
      var predefinedGPSets = _.sortBy(resp.data.geneProducts, 'name');
      var queryPredefined = $scope.query.targetSet;
      angular.forEach(predefinedGPSets, function (set) {
        if (queryPredefined && _.contains(queryPredefined.split(','), set.name)) {
          set.checked = true;
        } else {
          set.checked = false;
        }
        $scope.geneProductSets[set.name] = set;
      });
      if ($scope.query.geneProductId) {
        addGpIds($scope.query.geneProductId.split(','));
      }
    });
  };

  $scope.reset = function () {
    $scope.query.geneProductId = '';
    $scope.query.targetSet = '';
    $scope.updateQuery();
  };

  $scope.apply = function () {
    if ($scope.gpIds.length > 0) {
      $scope.addToQuery('geneProductId', _.pluck(_.filter($scope.gpIds, 'checked'), 'id'));
    }
    if ($scope.geneProductSets !== {}) {
      $scope.addToQuery('targetSet', _.pluck(_.filter($scope.geneProductSets, 'checked'), 'name'));
    }
  };

  var getQuery = function () {
    return;
  };

  $scope.addGPs = function () {
    var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea);
    addGpIds(gps);
    $scope.gpTextArea = '';
  };

  var addGpIds = function(gpids) {
    angular.forEach(gpids, function (gpID) {
      gpID = gpID.toUpperCase();
      if (validationService.validateGeneProduct(gpID)) {
        $scope.gpIds.unshift({
          id: gpID,
          checked: true
        });
      }
    });
  } ;

  initgpIds();
});
