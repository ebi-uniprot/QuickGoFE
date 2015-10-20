/**
 * Created by twardell on 26/02/2015.
 */
app.controller('GoTermHistoryCtrl', function($scope, basketService, goTermHistory) {


  //Use default
  var result = goTermHistory.query();

  result.$promise.then(function(data){

    $scope.history = data;
    console.log($scope.history);
  });


  /**
   *  Basket Functionality -------------------------------------------------------------------------------------------/
   */

  /**
   * Add an item to the basket
   * @type {Object|Array}
   */
  $scope.addToBasket = function(termId, termName){

    var basketItem = {termId: termId, name: termName};
    basketService.addBasketItem(basketItem);
    $scope.$emit('basketUpdate', basketService.basketQuantity());

  };

});

