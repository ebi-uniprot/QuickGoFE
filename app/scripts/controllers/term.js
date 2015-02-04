/**
 * Created by twardell on 02/02/2015.
 */
app.controller('TermCtrl', function($scope, $http, $modal, termDataService, basketService) {

  var termId='GO:0003824';
  $scope.countBasket = basketService.basketQuantity();

  if(basketService.containsItem(termId)){
    $scope.isInBasket = true;
    $scope.isNotInBasket = false;
    console.log("in basket");
  }else{
    $scope.isInBasket = false;
    $scope.isNotInBasket = true;
    console.log("not in basket");
  }


  var formattedURL='http://localhost:9080/ws/term/';

  //$scope.termModel = {"termId":"GO:0003824","name":"catalytic activity"};
  //$scope.termModel = {};
  //$scope.termModel = termDataService.getTerm(termId);

  $http.get(formattedURL+termId).success(function(data) {
    $scope.termModel = data;
    //$scope.termModel.isGoTerm=false;
    console.log($scope.termModel);
  });


  $scope.isObsolete = function() {
    return ($scope.termModel.active != true);
  }


  $scope.addItem = function(goId, termName){
    var basketItem = {goId:goId, termName:termName};
    console.log(basketService.addBasketItem(basketItem));
    $scope.countBasket = basketService.getItems().length;
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
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  /**
   * Pick up the basket update event from the modal
   */
  $scope.$on('basketUpdate', function(event, data) { $scope.countBasket = data; });


});
