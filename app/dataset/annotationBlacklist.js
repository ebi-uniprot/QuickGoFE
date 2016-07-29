/**
 * Created by twardell on 02/03/2015.
 */
app.controller('AnnotationBlacklistCtrl', function($scope, term, annotationBlacklist) {

  $scope.annotationBlacklist ={};
  $scope.blackListPromise = annotationBlacklist.query({}).$promise;
  $scope.blackListPromise.then(function (data) {
    $scope.annotationBlacklist = data;
  });

});

