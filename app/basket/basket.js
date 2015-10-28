/**
 * Created by twardell on 27/01/2015.
 */

app.controller('BasketCtrl', function($scope, $log, $modalInstance, $location, $uibModal, $q, basketService,
                                      filteringService, quickGOHelperService, term ) {


  $scope.basketItems = basketService.getItems();
  //console.log("The contents of the basket are ", $scope.basketItems);

  $scope.input_terms='';

  /**
   * ------------------------------------ Remove item from basket -----------------------------------------
   */

  $scope.removeItem = function(basketItem){
    console.log("REMOVE ITEM from BASKET");

    basketService.removeBasketItem(basketItem);

    //update displayed list
    $scope.basketItems = basketService.getItems();

    //Tell parent page this value has been updated.
    $scope.$emit('basketUpdate', basketService.basketQuantity());

  };


  /**
   * ------------------------------------ Submit -----------------------------------------------------------
   * Iterate through ALL selectable elements
   * Create a list of selected ones
   * Pass that list to the filtering service.
   */
  $scope.submit = function(){

    //This method is entered even when close-> ok() is called
    //todo this is a hack to get round this -- fix it.
    if($scope.input_terms == undefined){
      return;
    }

    var goIdsTargets = $scope.input_terms.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]|\s+/);
    angular.forEach(goIdsTargets, function(goId){
      basketService.addBasketItem(goId);
    })

    $scope.$emit('basketUpdate', basketService.basketQuantity());

    //reload basketItems list
    $scope.basketItems = basketService.getItems();

    //Clear the input text field
    $scope.input_terms = "";
  };

  /**
   * ------------------------------------ Forward To Term --------------------------------------------------------------
   */

  $scope.term = function(goId){
    $modalInstance.dismiss('forward');
    console.log("forward to term");
    $location.path("/term/"+goId); // path not hash
  };


  /**
   * -------------------------------------------------------------------------------------------------------------------
   * Show the Ancestors graph image modal on request.
   * Turn the list of basket items into to comma delimited list
   */
  $scope.showAncestorGraph = function () {

    console.log("[basket\basket.js] Show the Ancestor Graph");

    var k=0;
    var itemString="";
    for(k=0;k<$scope.basketItems.length;k++ ){
      itemString = itemString+$scope.basketItems[k].termId;
      itemString=itemString+',';
    }

    console.log("Item String", itemString);

    var modalInstance = $uibModal.open({
      templateUrl: 'charts/ontologyGraphModal.html',
      controller: 'OntologyGraphCtrl',
      windowClass: 'app-modal-window',
      scope: $scope,
      resolve: {
        graphModel: function () {
          return {id:itemString, scope:'GO'};
        }
      }
    });

  };


  /**
   * -------------------------------------------------------------------------------------------------------------------
   * Filter using basket go terms
   */
  $scope.filterUsingBasketTerms = function () {

    for (i = 0; i < $scope.basketItems.length; i++) {
      filteringService.saveValuesAsFilter('goID', $scope.basketItems[i].termId)
    }

    //Let the annotation list code know we have updated the filters
    $scope.$emit('filtersUpdate', 0);

    //Goodbye
    $modalInstance.dismiss('cancel');
  };

  /**
   * -------------------------------------------------------------------------------------------------------------------
   * Clear basket
   */
  $scope.emptyBasket = function () {
    $scope.basketItems = basketService.clearBasket();
    $scope.basketItems = [];
    $scope.$emit('basketUpdate', 0);
  };

  /**
   * -------------------------------------------------------------------------------------------------------------------
   * Export basket
   */
  $scope.exportBasket = function () {

    var text = '';
    for (i = 0; i < $scope.basketItems.length; i++) {

      text += $scope.basketItems[i].termId + "\t";
      text += $scope.basketItems[i].aspect + "\t";
      text += $scope.basketItems[i].name + "\n";
    }

    //Download blob
    var blob = new Blob([text], {type: "application/tsv;charset=utf-8;"});
    var downloadLink = angular.element('<a></a>');
    downloadLink.attr('href', window.URL.createObjectURL(blob));
    downloadLink.attr('download', 'basket.tsv');
    downloadLink[0].click();

  };



  $scope.isBasketEmpty = function (){
    return $scope.basketItems.length==0;
  }



    /**
   * Close window
   */
  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };
});

