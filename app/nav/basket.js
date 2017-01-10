'use strict';
app.controller('BasketNavCtrl', function($scope, $log, $modal, $rootScope, basketService) {

  $scope.countBasket = basketService.basketQuantity();

  /**
   * Pick up the basket update event from the modal
   */
  $rootScope.$on('basketUpdate', function() {
    $scope.countBasket = basketService.basketQuantity();
  });


  /**
   * Show the basket modal on request
   */


  $scope.openBasket = function () {
    $modal.open({
      templateUrl: 'basket/basketModal.html',
      size:'large',

      controller: function($scope, $modalInstance) {
        $scope.ok = function() {
          $modalInstance.close();
        };
      }
    });
};

});
