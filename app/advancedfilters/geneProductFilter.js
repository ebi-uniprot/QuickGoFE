app.controller('geneProductFilter', function($scope, stringService,
  validationService, hardCodedDataService){

  var initgpIds = function(){
    $scope.gpIds = [];
    $scope.geneProductSets =  hardCodedDataService.getGeneProductSets();
  };

  $scope.resetgpIds = function() {
    initgpIds()
  };

  $scope.resetGPType = function() {
  };

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
