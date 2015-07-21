angular.module('quickGoFeApp').controller('StartCtrl', function ($scope, $modal, $log, basketService, $location, filteringService) {

  /**
   * Initialisation
   */
  $scope.countBasket = basketService.basketQuantity();

  /**
   * Show the basket modal on request
   */
  $scope.showBasket = function () {

    var modalInstance = $modal.open({
      templateUrl: 'basket/basketModal.html',
      controller: 'BasketCtrl',
      size: 'lg',
      scope: $scope,
      resolve: {
        countBasket: function () {
          return $scope.countBasket;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.annotationList = function () {
    console.log("stuff");
    filteringService.clearFilters();
    $location.path("annotations");
  }

});
