/**
 * Created by twardell on 27/01/2015.
 */

app.controller('BasketCtrl', function($scope, $log, $modalInstance, $location, basketService, term ) {


  $scope.basketItems = basketService.getItems();
  console.log("The contents of the basket are ", $scope.basketItems);
  $scope.isLoading = 0;

  $scope.removeItem = function(basketItem){
    console.log("REMOVE ITEM from BASKET");

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
    console.log("SUBMIT CALLED");

    //Show loading screen
    $scope.isLoading = 1;

    //This method is entered even when close-> ok() is called
    //todo this is a hack to get round this -- fix it.
    if(basketModal == undefined){
      return;
    }

    console.log("Content of the basketModal", basketModal);
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

    basketModal.text = basketModal.text.replace(/\t/g, " ");   //tab
    basketModal.text = basketModal.text.replace(/\n/g, " ");   //The linux
    basketModal.text = basketModal.text.replace(/\r\n/g, " "); //Windows

    console.log("content of basketModal after replace", basketModal);
    var goIds = basketModal.text.split(" ");

    console.log("content of goids", goIds);
    console.log(goIds.length);

    var k =-1;
    for(k=0; k<goIds.length; k++){

      console.log("Might add to the basket", goIds[k]);

      var termId = goIds[k].trim();
      if(termId=="")continue;

      //Retrieval of term data is asynchronous
      console.log("attempting query for termId", termId);
      term.query({termId : termId}, function(termData){

        console.log("found term data ", termData);

        var savedTermId = termData.termId;
        var savedName = termData.name;
        console.log("saved term id ", savedTermId);
        console.log("savedName ", savedName);

        var basketItem = {termId: savedTermId, name: savedName};
        console.log("Adding basket item to basket ", basketItem);

        basketService.addBasketItem(basketItem);

        //Tell the value in the annotation list controller holding the number of basket items to update
        var qtyInBasket = basketService.basketQuantity();
        console.log("the quantity in the basket is " + qtyInBasket);

        $scope.$emit('basketUpdate', basketService.basketQuantity());

        //reload basketItems list
        $scope.basketItems = basketService.getItems();

        $scope.isLoading = 0;
      });


    }

    //Clear the input text field
    $scope.basketModal.text="";



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

