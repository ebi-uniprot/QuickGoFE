/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($scope, $http, $modal, $q, termDataService, basketService) {

  var formattedURL='http://localhost:9080/ws/term/';
  var termId='GO:0003824';
  //$scope.termModel = {};

  /**
   * Show basket quantity
   */
  $scope.countBasket = basketService.basketQuantity();
  console.log("qty in basket", $scope.countBasket);

  console.log("basket contains termId",basketService.containsItem(termId));

  //The following variable needs to be in scope
  //$scope.termModel = loadTermModel();

  /**
   * Get Term Data from WS
   */
  $http.get(formattedURL+termId).success(function(data) {
    $scope.termModel = data;
    console.log($scope.termModel);

    if(!basketService.containsItem(termId) && $scope.termModel.active == true){
      $scope.allowAddToBasket = true;
      $scope.preventAddToBasket = false;
      console.log("display add to basket");
    }else{
      $scope.allowAddToBasket = false;
      $scope.preventAddToBasket = true;
      console.log("already in basket or obsolete");
    }

  });

  //var loadTermModelPromise = function() {
  //  //try and get the data
  //  loadTermModel()
  //    //deal with what comes back with loadTermModel
  //    .then(function(data){
  //      $scope.termModel = data;
  //    }, function(error) {
  //      //err...
  //    });
  //};


  /**
   * Control display of add to basket buttons
   */
    //if(!basketService.containsItem(termId) && $scope.termModel.active == true){



  //$scope.termModel = {"termId":"GO:0003824","name":"catalytic activity"};
  //$scope.termModel = {};
  //$scope.termModel = termDataService.getTerm(termId);





  $scope.addItem = function(goId, termName){
    var basketItem = {goId:goId, termName:termName};
    console.log(basketService.addBasketItem(basketItem));
    $scope.countBasket =  basketService.basketQuantity();
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
  $scope.$on('basketUpdate', function(event, data) { $scope.countBasket = data; });


  //function loadTermModel(){
  //  $http.get(formattedURL+termId).success(function(data) {
  //    $scope.termModel = data;
  //    //$scope.termModel.isGoTerm=false;
  //    console.log(" get data from ws for termModel  ", $scope.termModel);
  //    return $scope.termModel;
  //  });
  //}

  //function loadTermModel() {
  //  return $http.get(formattedURL + termId)
  //    .then(function (response) {
  //      if (typeof response.data === 'object') {
  //        return response.data;
  //      } else {
  //        // invalid response
  //        return $q.reject(response.data);
  //      }
  //    }, function (response) {
  //      // something went wrong
  //      return $q.reject(response.data);
  //    });
  //};


});
