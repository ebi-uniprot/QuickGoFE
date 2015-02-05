/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($scope, $http, $modal, $q, termDataService, basketService) {

  var formattedURL='http://localhost:9080/ws/term/';
  var termId='GO:0003824';

  /**
   * Show basket quantity
   */
  $scope.countBasket = basketService.basketQuantity();


  /**
   * Get Term Data from WS
   */
  $http.get(formattedURL+termId).success(function(data) {
    $scope.termModel = data;
    console.log($scope.termModel);

    //Control if the basket shows
    //if(!basketService.containsItem(termId) && $scope.termModel.active == true){
    //  $scope.allowAddToBasket = true;
    //  $scope.preventAddToBasket = false;
    //  console.log("display add to basket");
    //}else{
    //  $scope.allowAddToBasket = false;
    //  $scope.preventAddToBasket = true;
    //  console.log("already in basket or obsolete");
    //}

    setupBasketButton($scope.termModel);

  });


  $scope.addItem = function(goId, termName){
    var basketItem = {goId:goId, termName:termName};
    console.log(basketService.addBasketItem(basketItem));
    $scope.countBasket =  basketService.basketQuantity();

    //Stop this item being added to the basket again
    $scope.allowAddToBasket = false;
    $scope.preventAddToBasket = true;
  }

  /**
   * Show the basket modal on request
   */
  $scope.showBasket = function () {

    var modalInstance = $modal.open({
      templateUrl: 'modals/basketModal.html',
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
      console.log('Modal dismissed at: ', new Date());
    });
  };


  /**
   * Pick up the basket update event from the modal
   */
  $scope.$on('basketUpdate', function(event, data) {

    console.log("Basket Update event has been called", event);
    console.log("Basket Update event has been called", data);

    $scope.countBasket = data;

    //$http.get(formattedURL+termId).success(function(data) {
    //  $scope.termModel = data;
    //  console.log($scope.termModel);

      //Control if the basket shows
      //if(!basketService.containsItem(termId) && $scope.termModel.active == true){
      //  $scope.allowAddToBasket = true;
      //  $scope.preventAddToBasket = false;
      //  console.log("display add to basket");
      //}else{
      //  $scope.allowAddToBasket = false;
      //  $scope.preventAddToBasket = true;
      //  console.log("already in basket or obsolete");
      //}

      setupBasketButton($scope.termModel);

    //});
  });


  function setupBasketButton(termModel){
    console.log("setup basket");

      //Control if the basket shows
      if(!basketService.containsItem(termId) && termModel.active == true){
        $scope.allowAddToBasket = true;
        $scope.preventAddToBasket = false;
        console.log("display add to basket");
      }else{
        $scope.allowAddToBasket = false;
        $scope.preventAddToBasket = true;
        console.log("already in basket or obsolete");
      }
  }


});
