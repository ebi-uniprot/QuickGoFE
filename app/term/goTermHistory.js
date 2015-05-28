/**
 * Created by twardell on 26/02/2015.
 */
app.controller('GoTermHistoryCtrl', function($scope, $modal, basketService, goTermHistory) {


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
   * Load basket quantity on page load.
   */

  $scope.countBasket = basketService.basketQuantity();
  $scope.isBasketShow = false;

  /**
   * Pick up the basket update event from the modal
   */
  $scope.$on('basketUpdate', function(event, data) { $scope.countBasket = data; });

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
      console.log('Modal dismissed at: ' + new Date());
    });
  };



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

