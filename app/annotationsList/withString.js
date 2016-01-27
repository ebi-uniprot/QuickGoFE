/**
 * Created by twardell on 27/01/2015.
 */

app.controller('WithStringCtrl', function($scope, $log, $uibModalInstance ) {

  /**
   * Close window
   */
  $scope.ok = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

