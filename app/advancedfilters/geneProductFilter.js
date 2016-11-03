app.controller('geneProductFilter', function ($scope, stringService,
  validationService, hardCodedDataService) {

  $scope.gpIds = [];
  $scope.geneProductSets = [];

  var initgpIds = function () {
    var predefinedGPSets = hardCodedDataService.getGeneProductSets();
    var queryPredefined = $scope.$parent.query.targetSet;
    angular.forEach(predefinedGPSets, function (set) {
      if (queryPredefined && _.contains(queryPredefined.split(','), set.value)) {
        set.checked = true;
      } else {
        set.checked = false;
      }
      $scope.geneProductSets.push(set);
    });
    if ($scope.$parent.query.geneProductId) {
      addGpIds($scope.$parent.query.geneProductId.split(','));
    }
  };

  $scope.reset = function () {
    $scope.$parent.query.geneProductId = '';
    $scope.$parent.query.targetSet = '';
    $scope.$parent.updateQuery();
  };

  $scope.apply = function () {
    if ($scope.gpIds.length > 0) {
      $scope.$parent.addToQuery('geneProductId', _.pluck(_.filter($scope.gpIds, 'checked'), 'id'));
    }
    if ($scope.geneProductSets.length > 0) {
      $scope.$parent.addToQuery('targetSet', _.pluck(_.filter($scope.geneProductSets, 'checked'), 'value'));
    }
  };

  var getQuery = function () {
    return;
  }

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
  }

  initgpIds();
});
