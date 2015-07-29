/**
 * Created by twardell on 02/03/2015.
 */
app.controller('TaxonConstraintsCtrl', function($scope, $modal, basketService, taxonConstraints) {

  $scope.taxonConstraints = taxonConstraints.query({});
  $scope.taxonConstraints.$promise.then(function (data) {
    $scope.taxonConstraints = data;
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
    $scope.countBasket = basketService.basketQuantity();

  };

});

