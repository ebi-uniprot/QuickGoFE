/**
 * Created by twardell on 16/02/2015.
 */


app.controller('GOSlimCtrl', function($scope, hardCodedDataService, PreDefinedSlimSets, PreDefinedSlimSetDetail, term) {

//  $scope.predefinedSlimSets = hardCodedDataService.getPreDefinedSlimSets();
  $scope.predefinedSlimSets = PreDefinedSlimSets.query();

  //$scope.bioProcessTerms = [{'goId':'GO:0006412', 'goName':'translation'}];
  $scope.availableTerms = [];
  $scope.enteredTerms = [];

  //$scope.molFunctionTerms = [];
  //$scope.cellComponentTerms = [];
  //$scope.predefinedTerms = [];

  /**
   * Model to hold selected go terms
   * @param selectedSlimSet
   */
  $scope.selectedGoTerms = {};

  $scope.showSlimSet = function(selectedSlimSet){
    console.log("Got selected slim set", selectedSlimSet);
    console.log("Got selected slim set #2", selectedSlimSet.subset);

    //Populated bioProcessTerms with Selected slim set
    //$scope.predefinedSlimSetBio = hardCodedDataService.getBioProcessTerms(selectedSlimSet.name);
    availableSlimList= PreDefinedSlimSetDetail.query({setId : selectedSlimSet.subset});
    console.log("Got retrieved Terms", $scope.availableSlimList);

    availableSlimList.$promise.then(function(data) {
      console.log("got promise", data);

      $scope.availableTerms = [];
      $scope.availableTerms =  $scope.availableTerms.concat($scope.availableSlimList);
      console.log("Added to bioProcessTerms", $scope.availableTerms);
    });

  }

  $scope.addOwnTerms = function(ownTermsList){

    console.log("Got own terms list", ownTermsList);
    var termData=term.query({termId : ownTermsList});
    console.log("Term Data", termData)

    //Parse list and add to predefined terms
    $scope.availableSlimList.$promise.then(function(data) {
      console.log("got promise", data);

      $scope.availableTerms = [];
      $scope.availableTerms =  $scope.availableTerms.concat($scope.availableSlimList);
      console.log("Added to bioProcessTerms", $scope.availableTerms);
    });
  }


});
