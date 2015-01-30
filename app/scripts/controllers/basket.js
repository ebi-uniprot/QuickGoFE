/**
 * Created by twardell on 27/01/2015.
 */

app.controller('BasketCtrl', ['$scope', 'basketService', function($scope, basketService) {


  $scope.basketItems = basketService.getItems();

  $scope.removeItem = function(basketItem){
    basketService.removeBasketItem(basketItem);
    $scope.basketItems = basketService.getItems();
  }

}]);
