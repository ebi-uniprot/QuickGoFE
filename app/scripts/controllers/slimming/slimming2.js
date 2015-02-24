/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl2', function($scope, wizardService) {


  $scope.selectedItems = wizardService.getSelectedTerms();
  console.log("selected items", $scope.selectedItems);

});
