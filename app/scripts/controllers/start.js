angular.module('quickGoFeApp').controller('StartCtrl', function ($scope, $modal, $log) {

  /**
   * Show the basket modal on request
   */
  $scope.goSlims = function () {

    var modalInstance = $modal.open({
      templateUrl: 'modals/slimmingModal.html',
      controller: 'SlimCtrl',
      size: 'lg',
      scope: $scope,
      resolve: {
        //countBasket: function () {
        //  return $scope.countBasket;
        // }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});
