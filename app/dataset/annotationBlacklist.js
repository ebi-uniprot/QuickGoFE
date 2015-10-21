/**
 * Created by twardell on 02/03/2015.
 */
app.controller('AnnotationBlacklistCtrl', function($scope, basketService, term, annotationBlacklist,
                                                   quickGOHelperService) {

  $scope.annotationBlacklist ={};
  $scope.blackListPromise = annotationBlacklist.query({}).$promise;
  $scope.blackListPromise.then(function (data) {
    $scope.annotationBlacklist = data;
  });


  /**
   *  Basket Functionality -------------------------------------------------------------------------------------------/
   */

  /**
   * Add an item to the basket
   * @type {Object|Array}
   */
  $scope.addToBasket = function(termId){

    //Look up the full termInformation to add it to the basket
    $scope.addPromise = term.query({termId : termId}).$promise; 

    $scope.addPromise.then(function(termData){
      //console.log("[annotationBlacklist] termData");

      var aspect =  quickGOHelperService.toAspectCode(termData.aspectDescription);
      var basketItem = {termId: termId, name: termData.name, aspect: aspect};

      basketService.addBasketItem(basketItem);

      //Tell all listeners the number of basket items needs updating
      $scope.$emit('basketUpdate', basketService.basketQuantity());
    });

    //var basketItem = {termId: savedTermId, name: savedName, aspect: ''};
    //basketService.addBasketItem(basketItem);

  };

  /**
   * TODO CURRENTLY COMMENTED OUT AS THERE ARE TOO MANY GO IDS ON SCREEN TO PROCESS ATM
   * Remove item from the basket
   * @type {Object|Array}
   */
  //$scope.removeFromBasket = function(termId){
  //  console.log(basketService.removeBasketItemById(termId));
  //  $scope.$emit('basketUpdate', basketService.basketQuantity());
  //};

  /**
   * TODO CURRENTLY COMMENTED OUT AS THERE ARE TOO MANY GO IDS ON SCREEN TO PROCESS ATM
   * Check if the go term is in the basket
   * @type {Object|Array}
   */
  //$scope.isInBasket = function(termId){
  //  console.log("Testing to see if this is in the basket", termId);
  //
  //  var isInBasket = basketService.containsGoTerm(termId);
  //  console.log("is this item in the basket", isInBasket);
  //
  //  return !isInBasket;
  //};


});

