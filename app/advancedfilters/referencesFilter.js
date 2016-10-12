app.controller('referencesFilter', function($scope){

  var initReference = function() {
    //References
    _filters.referenceSearch = {};
    var referenceList = hardCodedDataService.getFilterReferences();
    angular.forEach(referenceList, function(ref){
      _filters.referenceSearch[ref.refId] = false;
      _namesMap[ref.refId] = ref.name;
    });
  };

  $scope.addReferences = function() {
    var refs = stringService.getTextareaItemsAsArray($scope.referenceTextArea);
    angular.forEach(refs, function(refID){
      $scope.filters.referenceSearch[refID] = true;
    });
    $scope.referenceTextArea = '';
  };

});
