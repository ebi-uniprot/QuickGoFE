/**
 * Created by twardell on 02/03/2015.
 */
app.controller('TaxonConstraintsCtrl', function($scope, taxonConstraints) {

  $scope.taxonConstraints = taxonConstraints.query({});
  $scope.taxonConstraints.$promise.then(function (data) {
    $scope.taxonConstraints = data;
  });


});

