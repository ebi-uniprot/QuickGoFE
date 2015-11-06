/**
 * Created by twardell on 27/01/2015.
 */

app.controller('BasketCtrl', function($scope, $log, $uibModalInstance, $location, $uibModal, $q, basketService,
                                      filteringService, quickGOHelperService, termService ) {


  loadBasketItems = function() {
    $scope.basketPromise = basketService.getItems();
    $scope.basketPromise.then(function(d){
      $scope.basketItems = d.data;
    })
  }

  loadBasketItems();
  $scope.input_terms='';

  /**
   * ------------------------------------ Remove item from basket -----------------------------------------
   */

  $scope.removeItem = function(basketItem){
    basketService.removeBasketItem(basketItem);

    //update displayed list
    loadBasketItems();

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
    loadBasketItems();

    //Clear the input text field
    $scope.input_terms = "";
  };

  /**
   * ------------------------------------ Forward To Term --------------------------------------------------------------
   */

  $scope.term = function(goId){
    $uibModalInstance.dismiss('forward');
    $location.path("/term/"+goId); // path not hash
  };


  /**
   * -------------------------------------------------------------------------------------------------------------------
   * Show the Ancestors graph image modal on request.
   * Turn the list of basket items into to comma delimited list
   */
  $scope.showAncestorGraph = function () {
    var k=0;
    var itemString="";
    for(k=0;k<$scope.basketItems.length;k++ ){
      itemString = itemString+$scope.basketItems[k].termId;
      itemString=itemString+',';
    }
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
    $uibModalInstance.dismiss('cancel');
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



  $scope.isBasketNotEmpty = function (){
    return basketService.basketQuantity() > 0;
  }

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');    
  }

});

