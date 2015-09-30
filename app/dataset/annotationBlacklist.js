/**
 * Created by twardell on 02/03/2015.
 */
app.controller('AnnotationBlacklistCtrl', function($scope, $modal, basketService, term, annotationBlacklist) {

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
      console.log("[annotationBlacklist] termData");

      var savedTermId = termData.termId;
      var savedName = termData.name;

      var aspect = '';
      if(termData.aspectDescription == "Cellular Component"){
        aspect = 'C';
      }
      if(termData.aspectDescription == "Molecular Function"){
        aspect = 'F';
      }
      if(termData.aspectDescription == "Biological Process"){
        aspect = 'P';
      }

      var basketItem = {termId: savedTermId, name: savedName, aspect: aspect};

      basketService.addBasketItem(basketItem);

      //Tell all listeners the number of basket items needs updating
      $scope.$emit('basketUpdate', basketService.basketQuantity());
      $scope.isLoading = false;

    });

  };

});

