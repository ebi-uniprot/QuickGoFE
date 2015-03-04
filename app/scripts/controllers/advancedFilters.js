/**
 * Created by twardell on 04/03/2015.
 */
app.controller('AdvancedFiltersCtrl', function($scope, $modalInstance ) {




  /**
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };
});

