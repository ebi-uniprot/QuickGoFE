/**
 * Created by twardell on 03/03/2015.
 */
app.controller('AnnotationPostProcessingCtrl', function($scope, basketService, annotationPostProcessing,
                                                        quickGOHelperService) {

  $scope.annotationPostProcessing ={};
  $scope.myPromise = annotationPostProcessing.query({});
  $scope.myPromise.$promise.then(function (data) {
    $scope.annotationPostProcessing = data;
  });

});
