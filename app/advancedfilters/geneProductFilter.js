app.controller('geneProductFilter', function($scope, stringService,
  validationService, hardCodedDataService){

  $scope.gpIds = [];
  $scope.geneProductSets = [];

  var initgpIds = function(){
     var predefinedGPSets =  hardCodedDataService.getGeneProductSets();
     var queryPredefined = $scope.$parent.query.geneProductSubset;
     angular.forEach(predefinedGPSets, function(set) {
       console.log(queryPredefined);
       if(queryPredefined && _.contains(queryPredefined.split(','), set.value)) {
         set.checked = true;
       } else {
         set.checked = false;
       }
       $scope.geneProductSets.push(set);
     });
  };

  $scope.reset = function() {
    $scope.$parent.query.geneProductId = '';
    $scope.$parent.query.geneProductSets = '';
    $scope.$parent.updateQuery();
  };

  $scope.apply = function() {
    if($scope.gpIds.length > 0) {
      $scope.$parent.addToQuery('geneProductId', _.pluck(_.filter($scope.gpIds, 'checked'), 'id'));
    }
    if($scope.geneProductSets.length > 0) {
      console.log($scope.geneProductSets);
      $scope.$parent.addToQuery('geneProductSubset', _.pluck(_.filter($scope.geneProductSets, 'checked'), 'value'));
    }
  };

  var getQuery = function() {
    return ;
  }

  $scope.addGPs = function() {
    var gps = stringService.getTextareaItemsAsArray($scope.gpTextArea);
    angular.forEach(gps, function(gpID){
      if(validationService.validateGeneProduct(gpID)) {
        $scope.gpIds.unshift({
          id: gpID,
          checked: true
        });
      }
    });
    $scope.gpTextArea = '';
  };

  initgpIds();
});
