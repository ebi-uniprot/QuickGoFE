app.controller('qualifierFilter', function($scope){

  $scope.showAllNotQualifiers = 0;
  $scope.qualifiers = hardCodedDataService.getQualifiers();
  $scope.selectAllNotQualifiers = function () {
    angular.forEach($scope.qualifiers, function(qualifier) {
      if(qualifier.qualifier.startsWith('NOT'))
      $scope.filters.qualifier[qualifier.qualifier] = true;
    });
  };

});
