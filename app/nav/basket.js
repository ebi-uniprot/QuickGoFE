/**
 * Created by twardell on 27/01/2015.
 */

app.controller('BasketNavCtrl', function($scope, $log, $uibModal, $rootScope, basketService) {

  //$scope.countBasket=0;

  $scope.countBasket = basketService.basketQuantity();

  /**
   * Pick up the basket update event from the modal
   */
  $rootScope.$on('basketUpdate', function(event, data) {
    $scope.countBasket = basketService.basketQuantity();
  });


  /**
   * Show the basket modal on request
   */
  $scope.showBasket = function () {
    var modalInstance = $uibModal.open({
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
    });
  };


});

