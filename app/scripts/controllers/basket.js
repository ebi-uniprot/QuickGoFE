/**
 * Created by twardell on 27/01/2015.
 */

app.controller('BasketCtrl', function($scope, $log, $modalInstance, $location, basketService, term ) {


  $scope.basketItems = basketService.getItems();


  $scope.removeItem = function(basketItem){
    console.log("Remove item in basket.js")
    basketService.removeBasketItem(basketItem);

    //update displayed list
    $scope.basketItems = basketService.getItems();

    //Tell parent page this value has been updated.
    $scope.$emit('basketUpdate', basketService.basketQuantity());

  }


  /**
   * Iterate through ALL selectable elements
   * Create a list of selected ones
   * Pass that list to the filtering service.
   */
  $scope.submit = function(basketModal){


    console.log("In the basket modal ");
    // console.log("get the text area value", advancedFilters);
    //filteringService.setFilters(advancedFilters);

    //Tell parent page this value has been updated.

    //$scope.$emit('filtersUpdate', advancedFilters);

    //Now go back to the annotation list
    //$modalInstance.dismiss('cancel');
    //$location.path("annotations");

    //parse the contents of the textbox
    //iterate through elements found
    //look up GO Term based on the id
    //and save the resulting data to the basket.

    basketModal.text.replace(/\t/g, " ");   //tab
    basketModal.text.replace(/\r\n/g, " "); //Windows
    basketModal.text.replace(/\n/g, " ");   //The linux
    var goIds = basketModal.text.split(" ");

    var k =-1;
    for(k=0; k<goIds.size; k++){

      var termData=term.query({termId : goIds[k]});
      console.log(termData);
    }

    //var basketItem = {termId:termId, name:termName};
    //console.log(basketService.addBasketItem(basketItem));
    //$scope.countBasket = basketService.getItems().length;

  }




  $scope.term = function(goId){
    $modalInstance.dismiss('forward');
    console.log("forward to term");
    $location.path("/term/"+goId); // path not hash
  }


  /**
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };
});

