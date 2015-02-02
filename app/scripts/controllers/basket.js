/**
 * Created by twardell on 27/01/2015.
 */

app.controller('BasketCtrl', function($scope, $modal, $log, basketService) {


  $scope.basketItems = basketService.getItems();


  $scope.removeItem = function(basketItem){
    console.log("Remove item in basket.js")
    basketService.removeBasketItem(basketItem);

    //update displayed list
    $scope.basketItems = basketService.getItems();

    //Tell parent page this value has been updated.
    $scope.$emit('basketUpdate', basketService.basketQuantity());

  }

});

