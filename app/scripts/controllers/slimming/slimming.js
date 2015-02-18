/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl', function($scope, hardCodedDataService, PreDefinedSlimSets, PreDefinedSlimSetDetail) {

//  $scope.predefinedSlimSets = hardCodedDataService.getPreDefinedSlimSets();
  $scope.predefinedSlimSets = PreDefinedSlimSets.query();

  //$scope.bioProcessTerms = [{'goId':'GO:0006412', 'goName':'translation'}];
  $scope.bioProcessTerms = [];
  $scope.molFunctionTerms = [];
  $scope.cellComponentTerms = [];
  $scope.predefinedTerms = [];

  $scope.showSlimSet = function(selectedSlimSet){
    console.log("Got selected slim set", selectedSlimSet);
    console.log("Got selected slim set #2", selectedSlimSet.subset);

    //Populated bioProcessTerms with Selected slim set
    //$scope.predefinedSlimSetBio = hardCodedDataService.getBioProcessTerms(selectedSlimSet.name);
    $scope.availableSlimList= PreDefinedSlimSetDetail.query({setId : selectedSlimSet.subset});
    console.log("Got retrieved Terms", $scope.availableSlimList);

    $scope.availableSlimList.$promise.then(function(data) {
      console.log("got promise", data);

      $scope.bioProcessTerms = [];
      $scope.bioProcessTerms =  $scope.bioProcessTerms.concat($scope.availableSlimList);
      console.log("Added to bioProcessTerms", $scope.bioProcessTerms);
    });

  }

  $scope.addOwnTerms = function(ownTermsList){

    console.log("Got own terms list", ownTermsList);

    //Parse list and add to predefined terms
  }


});
