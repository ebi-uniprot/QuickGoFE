/**
 * Created by twardell on 018/01/2016.
 */
app.controller('OtherCtrl', function($scope, annotationPostProRules) {

  $scope.annotationPostProRules = {};

  $scope.ppRulesPromise=annotationPostProRules.query().$promise;

  $scope.ppRulesPromise.then(function(data) {
    $scope.annotationPostProRules = data;
  });


});
