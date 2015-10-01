/**
 * Created by twardell on 02/03/2015.
 */
app.controller('AnnotationBlacklistCtrl', function($scope, $modal, basketService, term, annotationBlacklist,
                                                   quickGOHelperService) {

  $scope.annotationBlacklist ={};
  $scope.myPromise = annotationBlacklist.query({});
  $scope.isLoading = true;

  $scope.myPromise.$promise.then(function (data) {
    $scope.annotationBlacklist = data;
    $scope.isLoading = false;

  });


  /**
   *  Basket Functionality -------------------------------------------------------------------------------------------/
   */

  /**
   * Add an item to the basket
   * @type {Object|Array}
   */
  $scope.addToBasket = function(termId){

    $scope.isLoading = true;

    //Look up the full termInformation to add it to the basket
    term.query({termId : termId}, function(termData){
      //console.log("[annotationBlacklist] termData");

      var aspect =  quickGOHelperService.toAspectCode(termData.aspectDescription);
      var basketItem = {termId: termId, name: termData.name, aspect: aspect};

      basketService.addBasketItem(basketItem);

      //Tell all listeners the number of basket items needs updating
      $scope.$emit('basketUpdate', basketService.basketQuantity());
      $scope.isLoading = false;

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

