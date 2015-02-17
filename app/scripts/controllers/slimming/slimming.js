/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl', function($scope, hardCodedDataService) {

  $scope.predefinedSlimSets = hardCodedDataService.getPreDefinedSlimSets();

  //$scope.bioProcessTerms = [{'goId':'GO:0006412', 'goName':'translation'}];
  $scope.bioProcessTerms = [];
  $scope.predefinedTerms = [];

  $scope.showSlimSet = function(selectedSlimSet){
    console.log("Got selected slim set", selectedSlimSet);

    //Populated bioProcessTerms with Selected slim set
    $scope.predefinedSlimSetBio = hardCodedDataService.getBioProcessTerms(selectedSlimSet.name);
    console.log("Got retrieved Terms", $scope.predefinedSlimSetBio);

    //Clear existing
    $scope.bioProcessTerms = [];
    $scope.bioProcessTerms =  $scope.bioProcessTerms.concat($scope.predefinedSlimSetBio);

    console.log("Added to bioProcessTerms", $scope.bioProcessTerms);



  }


});
