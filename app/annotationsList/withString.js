/**
 * Created by twardell on 27/01/2015.
 */

app.controller('AnnotationListModalController', function($scope, $log, $uibModalInstance,
  dbXrefService, $window) {

  /**
   * Close window
   */
  $scope.ok = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
