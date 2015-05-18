/**
 * Created by twardell on 02/02/2015.
 */
app.controller('DataSetCtrl', function($scope, annotationUpdates) {

  $scope.annotationUpdates = [];

  $scope.myPromise=annotationUpdates.query();

  $scope.myPromise.$promise.then(function(data) {

    console.log("go annotation updates back", data);
    $scope.annotationUpdates = data;
  });


});
