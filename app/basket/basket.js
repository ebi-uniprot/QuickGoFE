/**
 * Created by twardell on 27/01/2015.
 */

app.controller('BasketCtrl', function($scope, $log, $uibModalInstance, $location, $uibModal, $q,
                                      basketService, $cookieStore) {

  $scope.loadBasketItems = function() {
    var cookieItems = $cookieStore.get('uk.ac.ebi.quickgo.basket') || [] ;
    if (cookieItems.length === 0) {
      $scope.basketItems = [];
    } else {
      $scope.basketPromise = basketService.getItems();
      $scope.basketPromise.then(function(d){
        $scope.basketItems = d.data.results;
      });
    }
  };

  $scope.loadBasketItems();
  $scope.input_terms='';

  /**
   * ------------------------------------ Remove item from basket -----------------------------------------
   */

  $scope.removeItem = function(basketItem){
    basketService.removeBasketItem(basketItem.id);

    //update displayed list
    $scope.loadBasketItems();

    //Tell parent page this value has been updated.
    $scope.$emit('basketUpdate', basketService.basketQuantity());

  };


  /**
   * ------------------------------------ Submit -----------------------------------------------------------
   * Iterate through ALL selectable elements
   * Create a list of selected ones
   * Pass that list to the filtering service.
   */
  $scope.submit = function() {
    var terms = $scope.input_terms;
    //TODO we need to validate terms
    angular.forEach(terms.valid, function(term) {
      basketService.addBasketItem(term);
    });
    $scope.$emit('basketUpdate', basketService.basketQuantity());
    //reload basketItems list
    $scope.loadBasketItems();
    //Clear the input text field
    $scope.input_terms = "";
  };

  /**
   * ------------------------------------ Forward To Term --------------------------------------------------------------
   */

  $scope.term = function(goId){
    $uibModalInstance.dismiss('forward');
    $location.path("term/"+goId); // path not hash
  };


  /**
   * -------------------------------------------------------------------------------------------------------------------
   * Show the Ancestors graph image modal on request.
   * Turn the list of basket items into to comma delimited list
   */
  $scope.showAncestorGraph = function () {
    var k;
    var itemString="";
    for(k=0;k<$scope.basketItems.length;k++ ){
      itemString = itemString+$scope.basketItems[k].termId;
      itemString=itemString+',';
    }
    $uibModal.open({
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
    $location.search('goID', _.pluck($scope.basketItems, 'termId').join(","));
    $uibModalInstance.dismiss('cancel');
    $location.path("annotations/filter");
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
    angular.forEach($scope.basketItems, function(item){
      text += item.id + "\t";
      text += item.aspect + "\t";
      text += item.name + "\n";
    });
    var blob = new Blob([text], {type: "text/tsv;charset=utf-8;"});
    saveAs(blob, "basket.tsv");
  };

  $scope.isBasketNotEmpty = function (){
    console.log("ran isBasketNotEmpty");
    return basketService.basketQuantity() > 0;
  };

  // $scope.close = function() {
  //   $uibModalInstance.dismiss('cancel');
  // };

});
