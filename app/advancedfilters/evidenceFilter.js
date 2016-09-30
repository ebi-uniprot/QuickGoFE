app.controller('evidenceFilter', function($scope, evidenceService) {

  var init = function() {
    // Get Evidence Types
    $scope.ecos = {};
    $scope.ecoTermUse = 'ancestor';
    //TODO plug service when ready
    // evidenceService.getTypes().then(function(data) {
    //   var evidenceTypes = _.sortBy(data, 'evidenceGOID');
    //   //The order of the evidence codes is important
    //   angular.forEach(evidenceTypes, function(evidenceType) {
    //     evidenceType.checked = false;
    //     $scope.ecos.push(evidenceType);
    //   });
    // });
  };

  $scope.reset = function() {
    init();
  }

  $scope.addECOs = function() {
    var ecos = stringService.getTextareaItemsAsArray($scope.ecoTextArea);
    angular.forEach(ecos, function(ecoID) {
      if (validationService.validateECOTerm(ecoID)) {
        $scope.filters.ecoID[ecoID] = true;
      }
    });
    $scope.ecoTextArea = '';
  };

  init();
});
