/**
 * Created by twardell on 03/03/2015.
 */
app.controller('AnnotationPostProcessingCtrl', function($scope, basketService, annotationPostProcessing, term,
                                                        quickGOHelperService) {

  $scope.annotationPostProcessing ={};
  $scope.myPromise = annotationPostProcessing.query({});
  $scope.myPromise.$promise.then(function (data) {
    $scope.annotationPostProcessing = data;
    console.log("Annotation post processing", $scope.annotationPostProcessing);
  });

});
