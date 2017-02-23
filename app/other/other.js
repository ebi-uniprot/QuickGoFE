'use strict';
app.controller('OtherCtrl', function($scope, annotationPostProRules) {

  $scope.annotationPostProRules = {};

  $scope.ppRulesPromise=annotationPostProRules.query().$promise;

  $scope.ppRulesPromise.then(function(data) {
    $scope.annotationPostProRules = data;
  });


});
