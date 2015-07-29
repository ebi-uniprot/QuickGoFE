/**
 * Created by twardell on 02/02/2015.
 */
app.controller('DataSetCtrl', function($scope, annotationUpdates) {

  $scope.annotationUpdates = [];
  $scope.isLoading = true;

  $scope.myPromise=annotationUpdates.query();

  $scope.myPromise.$promise.then(function(data) {
    $scope.isLoading = true;

    console.log("go annotation updates back", data);
    $scope.annotationUpdates = data;
    $scope.isLoading = false;
  });


});
