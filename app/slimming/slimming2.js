/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl2', function($scope, basketService, wizardService) {

  $scope.selectedItems=[];

  //Return all predefined terms - some of which will have been selected.
  $scope.predefined = wizardService.getSelectedPredefinedTerms();
  angular.forEach($scope.predefined, function (aTerm) {
    if(aTerm.Selected){
      $scope.selectedItems.push(aTerm);
    }
  });

  $scope.selectedItems = $scope.selectedItems.concat();

  //console.log("wiggy wiz wizard",wizardService.getOwnTerms());
  $scope.selectedItems = $scope.selectedItems.concat(wizardService.getOwnTerms());


  //$scope.selectedItems = $scope.selectedItems.concat(wizardService.getSelectedBasketTerms());
  $scope.basketList = basketService.getItems();
  angular.forEach($scope.basketList, function (aTerm) {
    if(aTerm.Selected){
      $scope.selectedItems.push(aTerm);
    }
  });


  console.log("selected items", $scope.selectedItems);

});
