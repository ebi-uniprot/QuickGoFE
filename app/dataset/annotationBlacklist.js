/**
 * Created by twardell on 02/03/2015.
 */
app.controller('AnnotationBlacklistCtrl', function($scope, annotationBlacklist) {

  $scope.annotationBlacklist ={};
  $scope.myPromise = annotationBlacklist.query({});
  $scope.myPromise.$promise.then(function (data) {
    $scope.annotationBlacklist = data;
    console.log("Annotation blacklist", $scope.annotationBlacklist);
  });


});

