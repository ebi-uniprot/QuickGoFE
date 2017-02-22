'use strict';
app.controller('DataSetCtrl', function($scope, annotationUpdates) {

  $scope.annotationUpdates = [];

  $scope.dataSetPromise=annotationUpdates.query().$promise;

  $scope.dataSetPromise.then(function(data) {
    $scope.annotationUpdates = data;
  });


});
